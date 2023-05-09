FROM openjdk:11-jre-slim

# 호스트서버 경로에 있는 jar 파일을 복사(도커파일과 jar가 같은 경로에 있어야됨.)
COPY build/libs/minigame-0.0.1-SNAPSHOT.jar /app.jar

# 애플리케이션 실행
CMD ["java", "-jar", "/app.jar"]

#실행순서 참고
#이미지 빌드(도커파일 경로에서 실행) docker build -t minigame .
#컨테이너 실행docker run -d -p 9999:8080 minigame
