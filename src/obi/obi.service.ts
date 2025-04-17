import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import parse from 'node-html-parser';
import { Member } from 'src/member/entities/member.entity';
import { MemberService } from 'src/member/member.service';
import { ArticleDto } from 'src/navercafe/dto/article.dto';
import { NavercafeService } from 'src/navercafe/navercafe.service';
import { MoreThan, Repository } from 'typeorm';
import { SelectDateOBIDto } from './dto/select-date-obi.dto';
import { OBI } from './entities/obi.entity';

@Injectable()
export class ObiService {
  @InjectRepository(OBI)
  private readonly obiRepository: Repository<OBI>;
  @Inject()
  private readonly navercafeService: NavercafeService;
  @Inject()
  private readonly memberService: MemberService;
  private readonly logger = new Logger(ObiService.name);

  getYYMMDDString(dateTarget: Date) {
    const year = String(dateTarget.getFullYear());
    const month = '0' + String(dateTarget.getMonth() + 1);
    const date = '0' + String(dateTarget.getDate());
    return `${year.slice(-2)}${month.slice(-2)}${date.slice(-2)}`;
  }

  findOBIByDate(selectDateOBIDto: SelectDateOBIDto) {
    this.logger.log(`날짜별 뱅온정보 조회: ${selectDateOBIDto.date}`);
    return this.obiRepository.find({
      where: { date: selectDateOBIDto.date },
      relations: ['member'],
    });
  }

  findOBIRecent() {
    this.logger.log(`최근 뱅온정보 조회`);
    return this.obiRepository.find({
      where: {
        publishedTimestamp: MoreThan(
          new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        ),
      },
      order: { date: 'DESC' },
      relations: ['member'],
    });
  }

  convertTextToWeather(str: string): string {
    const weatherMap = {
      정보X: 'fog',
      정보x: 'fog',
      Not뱅: 'rain',
      낮뱅: 'sunny',
      '낮뱅/늦뱅확률50%': 'sunny',
      낮뱅or뱅온: 'sunny',
      낮뱅예상: 'cloudy',
      낮짧뱅: 'sunny',
      '낮짧뱅/뱅온': 'sunny',
      초늦뱅: 'sunny',
      늦뱅: 'sunny',
      늦혹평: 'sunny',
      '늦짧뱅확률50%': 'partly_cloudy',
      휴혹늦: 'cloudy',
      휴혹늦예상: 'cloudy',
      휴혹짧: 'cloudy',
      휴혹평: 'cloudy',
      휴혹낮: 'cloudy',
      '뱅온확률50%': 'cloudy',
      '뱅온/휴뱅': 'cloudy',
      '뱅온50%': 'cloudy',
      뱅온예상: 'cloudy',
      휴뱅예상: 'cloudy',
      '짧뱅확률50%': 'cloudy',
      뱅온: 'sunny',
      휴뱅뱅온: 'cloudy_s_sunny',
      뱅온중: 'sunny',
      '뱅온중/뱅온': 'sunny',
      '뱅온중/휴뱅': 'sunny_s_rain',
      '뱅온중/휴뱅예상': 'sunny_s_cloudy',
      '뱅온중/휴혹늦': 'sunny_s_cloudy',
      정기휴뱅: 'rain',
      휴뱅: 'rain',
      늦짧뱅: 'partly_cloudy',
      짧뱅: 'partly_cloudy',
      초짧뱅: 'partly_cloudy',
    };
    return weatherMap[str.replace(/[^0-9a-zA-Z가-힣ㄱ-ㅣ\/\%]/g, '')] || 'fog';
  }

  parseOBIData(members: Member[], article: ArticleDto) {
    const { contentHtml, writeDate } = article.article;
    const content = parse(contentHtml);

    const isedol = members.filter((mb) => mb.role === 'isedol');
    const result: OBI[] = [];
    const contentLines = content.querySelectorAll('p');
    const dateString = this.getYYMMDDString(new Date(writeDate));

    // console.log(article.article.subject);
    contentLines.forEach((line, i, lines) => {
      if (!line.text.includes(':')) {
        // 뱅온정보가 아닌 라인 스킵
        return;
      }
      // console.log(i, line.text);

      const targetMember = isedol.find((mb) => line.text.includes(mb.name));
      if (!targetMember) {
        // 이세돌 멤버가 아닌 라인 스킵
        return;
      }

      const obiItem = new OBI({
        id: `${dateString}:${targetMember.id}`,
        member: targetMember,
        date: dateString,
        updatedTimestamp: new Date(),
        publishedTimestamp: new Date(writeDate),
        weather: 'fog',
        rawInfo: '정보X',
        description: '',
      });

      // 뱅온정보 파싱
      const infoText = line.text
        .split(':')[1]
        .trim()
        .replace(/[^0-9a-zA-Z가-힣ㄱ-ㅣ\/\%]/g, '');
      obiItem.weather = this.convertTextToWeather(infoText);
      obiItem.rawInfo = infoText;

      // 언급 내용 파싱
      const next =
        lines[i + 1] &&
        lines[i + 1].text.replace(/&quot;/g, '"').match(/- (?<description>.+)/);
      const next2 =
        lines[i + 2] &&
        lines[i + 2].text
          .replace(/&quot;/g, '"')
          .match(/- +(?<description>.+)/);

      const description: string[] = [];
      if (next) {
        description.push(next.groups.description);
      }
      if (next2) {
        description.push(next2.groups.description);
      }
      obiItem.description = description.join('\n');

      result.push(obiItem);
    });

    return result;
  }

  async updateOBI() {
    this.logger.log(`뱅온정보 갱신 시작`);
    const members = await this.memberService.findAll();
    const obiArticles = await this.navercafeService.getArticleList({
      menuId: 347,
    });

    const { articleList } = obiArticles;

    const bangonArticles = articleList
      ?.filter(
        (item) =>
          item.subject.includes('뱅온정보') && !item.subject.includes('클립'),
      )
      .map((item) => ({
        subject: item.subject,
        articleId: item.articleId,
      }));

    if (!bangonArticles || bangonArticles.length === 0) {
      return {};
    }

    const latestArticleId = '' + bangonArticles[0].articleId;
    const weatherArticle =
      await this.navercafeService.getArticle(latestArticleId);

    const obis = this.parseOBIData(members, weatherArticle);
    this.logger.log(`뱅온정보 갱신 완료`);

    return await this.obiRepository.upsert(obis, ['id']);
  }
}
