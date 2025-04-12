export type ReadonlyRecord<P extends string = string, Q = P> = Readonly<
  Record<P, Q>
>;

export type LiveType = 'afreeca' | 'twitch' | 'twitter';

export const LivePlatformEnum: ReadonlyRecord<LiveType> = {
  afreeca: 'afreeca',
  twitch: 'twitch',
  twitter: 'twitter',
};

export type YoutubeChannelType = 'main' | 'sub' | 'clip' | 'replay';

export const YoutubeChannelEnum: ReadonlyRecord<YoutubeChannelType> = {
  main: 'main',
  sub: 'sub',
  clip: 'clip',
  replay: 'replay',
};

export type SocialType =
  | 'cafe'
  | 'twitter'
  | 'instagram'
  | 'soundcloud'
  | 'tiktok';

export const SocialEnum: ReadonlyRecord<SocialType> = {
  cafe: 'cafe',
  twitter: 'twitter',
  instagram: 'instagram',
  soundcloud: 'soundcloud',
  tiktok: 'tiktok',
};

export type Role =
  | 'master'
  | 'isedol'
  | 'family'
  | 'gomem'
  | 'academy'
  | 'hardcore';

export const RoleEnum: ReadonlyRecord<Role> = {
  master: 'master',
  isedol: 'isedol',
  gomem: 'gomem',
  academy: 'academy',
  hardcore: 'hardcore',
  family: 'family',
};

export type Live = {
  type: LiveType;
  name: string;
  id?: string;
};

export type YoutubeChannel = {
  type: YoutubeChannelType;
  name: string;
  id: string;
  uploads: string;
};

export type Social = {
  type: SocialType;
  name: string;
  id?: string;
};

export type Member = {
  id: string;
  name: string;
  role: Role;
  lives: Live[];
  youtube?: YoutubeChannel[];
  socials?: Social[];
};

export const Waktaverse: Member[] = [
  {
    id: '01HTYWPTRQPMBBN03797C60NZQ',
    name: '우왁굳',
    role: 'master',
    lives: [
      {
        type: 'afreeca',
        name: 'ecvhao',
        id: 'ecvhao',
      },
      {
        type: 'twitch',
        name: 'woowakgood',
        id: '49045679',
      },
      {
        type: 'twitter',
        name: 'jinjjawakgood',
        id: '1620374642430189569',
      },
    ],
    youtube: [
      {
        name: '본채널',
        type: 'main',
        id: 'UCBkyj16n2snkRg1BAzpovXQ',
        uploads: 'UUBkyj16n2snkRg1BAzpovXQ',
      },
      {
        name: '왁타버스',
        type: 'sub',
        id: 'UCzh4yY8rl38knH33XpNqXbQ',
        uploads: 'UUzh4yY8rl38knH33XpNqXbQ',
      },
      {
        name: '왁타버스 제로',
        type: 'clip',
        id: 'UCZOcwheypMvYN_J2oRBgt2A',
        uploads: 'UUZOcwheypMvYN_J2oRBgt2A',
      },
      {
        name: '우왁굳의 종합게임',
        type: 'sub',
        id: 'UChCqDNXQddSr0ncjs_78duA',
        uploads: 'UUhCqDNXQddSr0ncjs_78duA',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'ecvhao',
        id: 'Iep9BEdfIxd759MU7JgtSg',
      },
      {
        type: 'twitter',
        name: 'jinjjawakgood',
        id: '1620374642430189569',
      },
      {
        type: 'instagram',
        name: 'instawakgood',
      },
    ],
  },
  {
    id: '01HTYXH5RAR4NPW1Y1QD96FF6M',
    name: '아이네',
    role: 'isedol',
    lives: [
      {
        type: 'afreeca',
        name: 'inehine',
        id: 'inehine',
      },
      {
        type: 'twitch',
        name: 'vo_ine',
        id: '702754423',
      },
    ],
    youtube: [
      {
        name: '본채널',
        type: 'main',
        id: 'UCroM00J2ahCN6k-0-oAiDxg',
        uploads: 'UUroM00J2ahCN6k-0-oAiDxg',
      },
      {
        name: '데숙',
        type: 'clip',
        id: 'UCmHltryGykfakS-JmaxrNBg',
        uploads: 'UUmHltryGykfakS-JmaxrNBg',
      },
      {
        name: '다시보기',
        type: 'replay',
        id: 'UCBF6nBTgFN_xzrLMF9eiRhw',
        uploads: 'PLYnq9XTCbV2HW59Lt8R-uB0coidjCjZHX',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'vo_ine',
        id: 'Lp-S_8ZQuLCK03pDpod-7Q',
      },
      {
        type: 'instagram',
        name: 'ine_hamine',
      },
    ],
  },
  {
    id: '01HTYXYSS3YFAAPBR648J2DPHD',
    name: '징버거',
    role: 'isedol',
    lives: [
      {
        type: 'afreeca',
        name: 'jingburger1',
        id: 'jingburger1',
      },
      {
        type: 'twitch',
        name: 'jingburger',
        id: '237570548',
      },
      {
        type: 'twitter',
        name: 'jing_burger',
        id: '886087131914944513',
      },
    ],
    youtube: [
      {
        name: '본채널',
        type: 'main',
        id: 'UCHE7GBQVtdh-c1m3tjFdevQ',
        uploads: 'UUHE7GBQVtdh-c1m3tjFdevQ',
      },
      {
        name: '징짱',
        type: 'clip',
        id: 'UC-S9NE-xzcBpxOFSvsmOzAA',
        uploads: 'UU-S9NE-xzcBpxOFSvsmOzAA',
      },
      {
        name: '츠쿠요미',
        type: 'replay',
        id: 'UCrN7Gb8xIZF_0ZYA1cmVNxQ',
        uploads: 'UUrN7Gb8xIZF_0ZYA1cmVNxQ',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'frog_o',
        id: '8g_F8kj48MSqBeVnVAhnCw',
      },
      {
        type: 'twitter',
        name: 'jing_burger',
        id: '886087131914944513',
      },
      {
        type: 'instagram',
        name: 'jing_burger',
      },
      {
        type: 'soundcloud',
        name: 'jingburger',
      },
      {
        type: 'tiktok',
        name: 'jingburger_tiktok',
      },
    ],
  },
  {
    id: '01HTYY59CYV8A58633V2BYWGGD',
    name: '릴파',
    role: 'isedol',
    lives: [
      {
        type: 'afreeca',
        name: 'lilpa0309',
        id: 'lilpa0309',
      },
      {
        type: 'twitch',
        name: 'lilpaaaaaa',
        id: '169700336',
      },
      {
        type: 'twitter',
        name: 'lilpa_official',
        id: '1699854272576516096',
      },
    ],
    youtube: [
      {
        name: '본채널',
        type: 'main',
        id: 'UC-oCJP9t47v7-DmsnmXV38Q',
        uploads: 'UU-oCJP9t47v7-DmsnmXV38Q',
      },
      {
        name: '순간들',
        type: 'clip',
        id: 'UC8dEJs2kpS5x2vI1X7aaUhA',
        uploads: 'UU8dEJs2kpS5x2vI1X7aaUhA',
      },
      {
        name: '다시보기',
        type: 'replay',
        id: 'UCp_jHNjcoiXC7SlElrBmzBA',
        uploads: 'UUp_jHNjcoiXC7SlElrBmzBA',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'beautyleec',
        id: 'ANjFuUREskKRC7DcGwAXNA',
      },
      {
        type: 'twitter',
        name: 'lilpa_official',
        id: '1699854272576516096',
      },
      {
        type: 'instagram',
        name: 'lilpaaaaaa_',
      },
      {
        type: 'soundcloud',
        name: 'bhdred9q6qtd',
      },
    ],
  },
  {
    id: '01HTYYB6AKM8QS519FD9WMKNPG',
    name: '주르르',
    role: 'isedol',
    lives: [
      {
        type: 'afreeca',
        name: 'cotton1217',
        id: 'cotton1217',
      },
      {
        type: 'twitch',
        name: 'cotton__123',
        id: '203667951',
      },
      {
        type: 'twitter',
        name: 'jururu_twitch',
        id: '1341013061981806592',
      },
    ],
    youtube: [
      {
        name: '본채널',
        type: 'main',
        id: 'UCTifMx1ONpElK5x6B4ng8eg',
        uploads: 'UUTifMx1ONpElK5x6B4ng8eg',
      },
      {
        name: '봉풀주',
        type: 'clip',
        id: 'UCgGvSg2lscdNUx9ZJIBh9FQ',
        uploads: 'UUgGvSg2lscdNUx9ZJIBh9FQ',
      },
      {
        name: '다시보기',
        type: 'replay',
        id: 'UCo28fS0LmlcyPcKItrZMPiQ',
        uploads: 'UUo28fS0LmlcyPcKItrZMPiQ',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'porori9999',
        id: 'ri0vjEn1-XpglkwfwSDuBw',
      },
      {
        type: 'twitter',
        name: 'jururu_twitch',
        id: '1341013061981806592',
      },
      {
        type: 'instagram',
        name: 'ju_ruru_',
      },
      {
        type: 'soundcloud',
        name: 'jururu123',
      },
      {
        type: 'tiktok',
        name: 'ju_ruru_',
      },
    ],
  },
  {
    id: '01HTYYFXH1GSSQD584HDTVMN2V',
    name: '고세구',
    role: 'isedol',
    lives: [
      {
        type: 'afreeca',
        name: 'gosegu2',
        id: 'gosegu2',
      },
      {
        type: 'twitch',
        name: 'gosegugosegu',
        id: '707328484',
      },
      {
        type: 'twitter',
        name: 'gosegu486385',
        id: '1681727526706765825',
      },
    ],
    youtube: [
      {
        name: '본채널',
        type: 'main',
        id: 'UCV9WL7sW6_KjanYkUUaIDfQ',
        uploads: 'UUV9WL7sW6_KjanYkUUaIDfQ',
      },
      {
        name: '짧은거',
        type: 'clip',
        id: 'UCSSPlgcyDA5eoN3hrkXpvHg',
        uploads: 'UUSSPlgcyDA5eoN3hrkXpvHg',
      },
      {
        name: '밥친구',
        type: 'replay',
        id: 'UCc4qGj6d8LBXW2qZ9GZQWqQ',
        uploads: 'UUc4qGj6d8LBXW2qZ9GZQWqQ',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'fizz00nico88',
        id: 'kvYmWvSHP9_wnnbRX4nGXg',
      },
      {
        type: 'twitter',
        name: 'gosegu486385',
        id: '1681727526706765825',
      },
      {
        type: 'instagram',
        name: 'gosegu_official',
      },
      {
        type: 'soundcloud',
        name: 'ja2efzg96bap',
      },
    ],
  },
  {
    id: '01HTYYN8ZGT1X22F9DM5BVB1RG',
    name: '비챤',
    role: 'isedol',
    lives: [
      {
        type: 'afreeca',
        name: 'viichan6',
        id: 'viichan6',
      },
      {
        type: 'twitch',
        name: 'viichan6',
        id: '195641865',
      },
      {
        type: 'twitter',
        name: 'viichan6',
        id: '1000725569892306945',
      },
    ],
    youtube: [
      {
        name: '본채널',
        type: 'main',
        id: 'UCs6EwgxKLY9GG4QNUrP5hoQ',
        uploads: 'UUs6EwgxKLY9GG4QNUrP5hoQ',
      },
      {
        name: '나랑놀아',
        type: 'clip',
        id: 'UCuJUfqThFp5-k-lrHcO1dFg',
        uploads: 'UUuJUfqThFp5-k-lrHcO1dFg',
      },
      {
        name: '무릉도원',
        type: 'replay',
        id: 'UCk2vPN7LATiMz_r8VUiA0KQ',
        uploads: 'UUk2vPN7LATiMz_r8VUiA0KQ',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'r-mya',
        id: '6Wj7By3k4NnbeXohIaIltQ',
      },
      {
        type: 'twitter',
        name: 'viichan6',
        id: '1000725569892306945',
      },
      {
        type: 'instagram',
        name: 'viichan6',
      },
      {
        type: 'soundcloud',
        name: 'viichan6',
      },
    ],
  },
  {
    id: '01HTYYSQVV2BPKQXXDND7M0S9R',
    name: '천양',
    role: 'family',
    lives: [
      {
        type: 'afreeca',
        name: '243000',
        id: '243000',
      },
      {
        type: 'twitch',
        name: 'chunyangkr',
        id: '132782743',
      },
    ],
    youtube: [],
    socials: [
      {
        type: 'cafe',
        name: 'dldus2430',
        id: '9bNWYMtcwoY6LzORvkv4AA',
      },
      {
        type: 'twitter',
        name: 'chunyangkr',
        id: '1668740261328097280',
      },
      {
        type: 'instagram',
        name: 'chunyang_94',
      },
    ],
  },
  {
    id: '01HTYZ5JY7FD181KH2SQEJ9JKT',
    name: '뢴트게늄',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'jey422',
        id: 'jey422',
      },
      {
        type: 'twitch',
        name: '111roentgenium',
        id: '137881582',
      },
    ],
    youtube: [],
    socials: [
      {
        type: 'cafe',
        name: 'jey422',
        id: '3nS2SUrY0hg4aj7NHoqy8g',
      },
      {
        type: 'twitter',
        name: 'rtgn111',
        id: '705059862170832896',
      },
      {
        type: 'instagram',
        name: '111_roentgenium',
      },
    ],
  },
  {
    id: '01HTZ05D788D20440SWPTRKE0H',
    name: '도파민박사',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'realdopamine',
        id: 'realdopamine',
      },
      {
        type: 'twitch',
        name: 'dopamine_dr',
        id: '686366264',
      },
    ],
    youtube: [],
    socials: [
      {
        type: 'cafe',
        name: 'kingstate123',
        id: 'dmzmNtHPqhKT66qc9O3Idg',
      },
    ],
  },
  {
    id: '01HTZ05GK99J8C2DXBP0H9EY3G',
    name: '비밀소녀',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'secretto486',
        id: 'secretto486',
      },
      {
        type: 'twitch',
        name: 'secretmemolee',
        id: '691305503',
      },
    ],
    youtube: [],
    socials: [
      {
        type: 'cafe',
        name: 'mkhwa12',
        id: 'em8P7gPkEC0xnKf1i-lBUw',
      },
    ],
  },
  {
    id: '01HTZ05MC03TW0N4Q10SZJ5HFX',
    name: '해루석',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'sangsoak',
        id: 'sangsoak',
      },
      {
        type: 'twitch',
        name: 'rusuk_',
        id: '55452641',
      },
    ],
    youtube: [],
    socials: [
      {
        type: 'cafe',
        name: 'sangsoak',
        id: '0H9flIcB6dYOeTmN6PH4MA',
      },
    ],
  },
  {
    id: '01HTZ05RVGRSGZPSMXGMN1BW23',
    name: '히키킹',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'hikiking',
        id: 'hikiking',
      },
      {
        type: 'twitch',
        name: 'hikiking0',
        id: '637081198',
      },
    ],
    youtube: [],
    socials: [
      {
        type: 'cafe',
        name: 'slem_i',
        id: 'YIzqsOrv0ceegCc6A3STdw',
      },
    ],
  },
  {
    id: '01HTZ05V709R0QXFZ9K5AC6E19',
    name: '풍신',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'waktapungsin',
        id: 'waktapungsin',
      },
      {
        type: 'twitch',
        name: 'pung_sin',
        id: '688493905',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'djdj00824',
        id: '6yVccjXPFv_pS9UnmKFFqA',
      },
    ],
  },
  {
    id: '01HTZ05YARFEPN0HJMD36T6EM6',
    name: '독고혜지',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'dokkhye',
        id: 'dokkhye',
      },
      {
        type: 'twitch',
        name: 'dokkhye_',
        id: '726101394',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'dokkhye_',
        id: 'pp8YQn6nQWzX_sl1VnPaEw',
      },
    ],
  },
  {
    id: '01HTZ06330BF5NWJPQ90R9PNVN',
    name: '소피아',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'seungri170',
        id: 'seungri170',
      },
      {
        type: 'twitch',
        name: 'ssoph25',
        id: '724476973',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'qwer50311',
        id: 'V692ukwzbWWS5u1SAaE7Ow',
      },
    ],
  },
  {
    id: '01HTZ067S75SFN4YPMKPEXAEMW',
    name: '이덕수 할아바이',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: '2ducksoo',
        id: '2ducksoo',
      },
      {
        type: 'twitch',
        name: '2ducksoo',
        id: '694571266',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'nightmandu1234',
        id: '_S6ONLYWD-KwP27X0aOB7g',
      },
    ],
  },
  {
    id: '01HTZ06FJHBQB4HJADTDC8ZFC0',
    name: '티파니0421',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'w96idqb',
        id: 'w96idqb',
      },
      {
        type: 'twitch',
        name: 'haku_0089_',
        id: '727383392',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'myaron9709',
        id: 'GYEvGI4kJl_-PdOl7WWWeA',
      },
    ],
  },
  {
    id: '01HTZ06JE9N8Y7JGY5HHX9ZK48',
    name: '비즈니스 킴',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'dks336',
        id: 'dks336',
      },
      {
        type: 'twitch',
        name: 'businesskim111',
        id: '692399509',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'rlawjdtlr444',
        id: '5iriL01Muz_Nn8kyT3SSDA',
      },
    ],
  },
  {
    id: '01HTZ06NDS1479DQTWR61JBZXA',
    name: '카르나르 융터르',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'jungtur',
        id: 'jungtur',
      },
      {
        type: 'twitch',
        name: 'carnarjungtur',
        id: '776127800',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'tanglecell',
        id: 'pGZRtq-dDgrw9oQavOhpeg',
      },
    ],
  },
  {
    id: '01HTZ0706HJ9A1RXQ0H6J30BAA',
    name: '바이터',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'freeter19999',
        id: 'freeter19999',
      },
      {
        type: 'twitch',
        name: 'freeter1999',
        id: '757269147',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'lssj0305',
        id: 'Wfu7vhyqa4k22No4cZ_mXA',
      },
    ],
  },
  {
    id: '01HTZ07359ENNWDEN9VY7VXTKV',
    name: '김치만두번영택사스가',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'cman0327',
        id: 'cman0327',
      },
      {
        type: 'twitch',
        name: 'cman0327',
        id: '495411373',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'cman0327',
        id: '4_3leHLMSbdHOrsJQUb3ig',
      },
    ],
  },
  {
    id: '01HTZ077QHVZDFHMTWR4ANM56W',
    name: '캘리칼리 데이비슨',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'chronicleyul',
        id: 'chronicleyul',
      },
      {
        type: 'twitch',
        name: 'invenxd',
        id: '708871268',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'madmad5',
        id: 'Z_ug1ZX4oIH-cLOrl4A4BQ',
      },
    ],
  },
  {
    id: '01HTZ07B11BJHNYMSJYANBAE02',
    name: '단답벌레',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'dandapbug0',
        id: 'dandapbug0',
      },
      {
        type: 'twitch',
        name: 'dandapbug',
        id: '529929528',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'jhjihoo2',
        id: 'zw09IEZx8fYSgj4YAOny5w',
      },
    ],
  },
  {
    id: '01HTZ07E1AMCTKW0E46V689ZJ8',
    name: '곽춘식',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'kwakchunshik',
        id: 'kwakchunshik',
      },
      {
        type: 'twitch',
        name: 'realchunshik',
        id: '171950282',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'yes6695',
        id: 'U7H6xCuqqm98tIrMI8-V0Q',
      },
    ],
  },
  {
    id: '01HTZ07GRQ307YS4BN0T1ZD6VN',
    name: '왁파고',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'wakphago',
        id: 'wakphago',
      },
      {
        type: 'twitch',
        name: 'wakphago',
        id: '693895624',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'kim2281128',
        id: 'nGFTXp2VowjvXgZJnZb5QQ',
      },
    ],
  },
  {
    id: '01HTZ07KVJHZ7TXB8B9SK7V83Y',
    name: '권민',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'kwonmingomem',
        id: 'kwonmingomem',
      },
      {
        type: 'twitch',
        name: 'kwonmin98',
        id: '689539974',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'kisukwon98',
        id: '4xi7FarPpBXVK0tU5L8uiw',
      },
    ],
  },
  {
    id: '01HTZ07PW1T204XVPR61PF59E2',
    name: '노스페라투 호드',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'nosferatuhod',
        id: 'nosferatuhod',
      },
      {
        type: 'twitch',
        name: 'nosferatu_hodd',
        id: '833390409',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'lll1419',
        id: 'iQgngYB-fw-YL6XAhvZ_tA',
      },
    ],
  },
  {
    id: '01HTZ07SS1XGQT66JYA5066MXH',
    name: '부정형인간',
    role: 'gomem',
    lives: [
      {
        type: 'afreeca',
        name: 'bujungingan',
        id: 'bujungingan',
      },
      {
        type: 'twitch',
        name: 'bujungingan',
        id: '147540755',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'bujungingan',
        id: 'qJTyM9laoJ4dKYDyNoImTw',
      },
    ],
  },
  {
    id: '01HTZ07W9HC6WK3JTSK4ZZYV45',
    name: '닌닌',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: 'nnininin',
        id: 'nnininin',
      },
      {
        type: 'twitch',
        name: 'ninnin__2',
        id: '833726111',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'nininin_',
        id: 'GOjQfCMnVnG9NVsQVTuJdg',
      },
    ],
  },
  {
    id: '01HTZ081BSEANMPB8BTHY7CEPN',
    name: '불곰',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: 'bulgom77',
        id: 'bulgom77',
      },
      {
        type: 'twitch',
        name: 'bodyguard365',
        id: '921595171',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'lgyoochs',
        id: 'OJBFHo9qW0XsKldQsIHshA',
      },
    ],
  },
  {
    id: '01HTZ084M9JZQBMPPC1NAR21AV',
    name: '시리안 레인',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: 'sirianrain',
        id: 'sirianrain',
      },
      {
        type: 'twitch',
        name: 'sirian_sps',
        id: '913218793',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'sirian_sps',
        id: 'vYaczNVti51uUgdZ55DWLA',
      },
    ],
  },
  {
    id: '01HTZ0870J8TXY1B9STTS9HZ9A',
    name: '아마데우스최',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: 'kjm13579',
        id: 'kjm13579',
      },
      {
        type: 'twitch',
        name: 'amadeus_choi_twitch',
        id: '475399891',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'monkeynight2',
        id: 'L5-_Ve_qS8DP7FEZPnt3Ag',
      },
    ],
  },
  {
    id: '01HTZ089F1611ZFA38SCJEGQSP',
    name: '진희',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: 'jinhejinhe',
        id: 'jinhejinhe',
      },
      {
        type: 'twitch',
        name: 'jinhejinhe',
        id: '496948926',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'dkfusry',
        id: 'g9Uesu0Y2TDYbxWCOUrxUw',
      },
    ],
  },
  {
    id: '01HTZ08CTJR15V6KQFA76AQ389',
    name: '캡틴 설리반',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: '20230609',
        id: '20230609',
      },
      {
        type: 'twitch',
        name: 'sullivan_pirate',
        id: '850573153',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'hiimgarp',
        id: 'CyY79bZUCGfu6lAL-6hebg',
      },
    ],
  },
  {
    id: '01HTZ08J017ZNE3SC5F7BGEHN7',
    name: '사랑전도사 젠투',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: 'wpsxngotek96',
        id: 'wpsxngotek96',
      },
      {
        type: 'twitch',
        name: 'wpsxnfkdrp963',
        id: '902414237',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'dlepffld852',
        id: 'b_DkKJUJwVQuv4X3FkZzlw',
      },
    ],
  },
  {
    id: '01HTZ08NASAEKG4JRT6VSH869B',
    name: '수셈이',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: 'soosemi432',
        id: 'soosemi432',
      },
      {
        type: 'twitch',
        name: 'soosemi432',
        id: '886072449',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'thornses23',
        id: 'ZIEZUOY4TlqoR_wHcADlEw',
      },
    ],
  },
  {
    id: '01HTZ08RCSFGXJJWPQM1RR725Z',
    name: '철도왕 길버트',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: 'gilbet1801',
        id: 'gilbet1801',
      },
      {
        type: 'twitch',
        name: 'vanderbiltgilbert',
        id: '913230860',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'gilbet1801',
        id: 'StZWwA97YDOvPhkZN3idFg',
      },
    ],
  },
  {
    id: '01HTZ08V3AAMP2G4CR69YTS46R',
    name: '미미짱짱세용',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: 'n1574cat',
        id: 'n1574cat',
      },
      {
        type: 'twitch',
        name: 'mimi_chanchan_',
        id: '906828548',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: '1574cat',
        id: 'tHgxHzPLuJlxwQSW3RmDCQ',
      },
    ],
  },
  {
    id: '01HTZ08XRHYBB5STGXQ96Y3HT3',
    name: '빅토리',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: 'toryvac',
        id: 'toryvac',
      },
      {
        type: 'twitch',
        name: '0219victory',
        id: '913218759',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'tgb_plant',
        id: 'jV_7B_N98_wI_VKnIGa40g',
      },
    ],
  },
  {
    id: '01HTZ090B9VV4Y4QJXNS5J2MGQ',
    name: '데스해머쵸로키',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: 'deathhammer',
        id: 'deathhammer',
      },
      {
        type: 'twitch',
        name: 'deathhammer_',
        id: '937121095',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'deathhammer',
        id: 'CU_beo26pSFQX3UaMmnxaQ',
      },
    ],
  },
  {
    id: '01HTZ092ZPCMG4RMXVKJ1GXA4J',
    name: '크리즈',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: 'kreaze',
        id: 'kreaze',
      },
      {
        type: 'twitch',
        name: 'kreaze_',
        id: '932882108',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'never_1234',
        id: '9NaYPzulwQeXuAAcXlpFhw',
      },
    ],
  },
  {
    id: '01HTZ095JJKSWE8EN0WQBR7NVQ',
    name: '아이 쓰께끼',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: 'icekkekki',
        id: 'icekkekki',
      },
      {
        type: 'twitch',
        name: 'icekkekki',
        id: '938325961',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'bbongfar',
        id: 'DPevjMoUL8p8Meev7ABrLw',
      },
    ],
  },
  {
    id: '01HTZ09851FDZ2B9N5P3GB84NM',
    name: '성기사 샬롯',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: 'sl0724',
        id: 'sl0724',
      },
      {
        type: 'twitch',
        name: 'cl_0724',
        id: '985416673',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'sl_0724',
        id: 'Rd2yiwnXvedaP6kb38nDJg',
      },
    ],
  },
  {
    id: '01HTZ09BGTK8G90G4RHXE685F9',
    name: '버터우스 3세',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: 'butteruslll',
        id: 'butteruslll',
      },
      {
        type: 'twitch',
        name: 'butterusiii',
        id: '934896936',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'butterusiii',
        id: 'OBvrBhAAakJl0Ablyz3Cpg',
      },
    ],
  },
  {
    id: '01HV28Y32XTQ9GSRWQAFK35YNZ',
    name: '메카 맹기산',
    role: 'academy',
    lives: [
      {
        type: 'afreeca',
        name: 'maenggisan',
        id: 'maenggisan',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'meen308',
        id: 'YmEct7wpqzv3Fkoy9bzxMg',
      },
    ],
  },
  {
    id: '01JRKZMV8F2PMB66F2BHCX04AA',
    name: '도깨비공주 루딘',
    role: 'hardcore',
    lives: [
      {
        type: 'afreeca',
        name: 'xxxx922',
        id: 'xxxx922',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'x_x922',
        id: 'w8C4PJ9vgSdcrHXab6wpuA',
      },
    ],
  },
  {
    id: '01JRKZP7GSSSN0CKXY6XH2W0RN',
    name: '바룬상',
    role: 'hardcore',
    lives: [
      {
        type: 'afreeca',
        name: 'barunsang',
        id: 'barunsang',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'barunsang',
        id: 'Sa_eVKJdSxfvndzpVo1qqw',
      },
    ],
  },
  {
    id: '01JRKZPD416ZFPDS05G3SSPRPH',
    name: '제갈 통',
    role: 'hardcore',
    lives: [
      {
        type: 'afreeca',
        name: 'jegaltong',
        id: 'jegaltong',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'deerland1217',
        id: 'jGAmk0zN5RaHhNSLoEp80A',
      },
    ],
  },
  {
    id: '01JRKZPGG165YNJDKTMVP7SN1J',
    name: '촌장 고봉',
    role: 'hardcore',
    lives: [
      {
        type: 'afreeca',
        name: 'goatgobong',
        id: 'goatgobong',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'jonte_',
        id: 'QgZJB_q_4EmJzY1yQ3B_yg',
      },
    ],
  },
  {
    id: '01JRKZPKW1BCR345JKEXCQM8V4',
    name: '코드네임 로즈',
    role: 'hardcore',
    lives: [
      {
        type: 'afreeca',
        name: 'coderose',
        id: 'coderose',
      },
    ],
    socials: [
      {
        type: 'cafe',
        name: 'code_rose_',
        id: '8HauMJP7UZ8YSnx-4W66Sg',
      },
    ],
  },
];
