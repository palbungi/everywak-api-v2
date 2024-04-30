FROM node:18-alpine AS build

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# 앱 의존성 설치
COPY package*.json ./

RUN npm install

# 앱 소스 추가
COPY . .

# 앱 빌드
RUN npm run build

# prod stage
FROM node:18-alpine
WORKDIR /usr/src/app
# 타임존 설정
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ENV NODE_ENV production
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --only=production
RUN rm package*.json

EXPOSE 3000
CMD [ "node", "dist/main.js" ]
