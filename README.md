![ModuON](https://i.imgur.com/gAZHUwl.png)

# 프로젝트 요약

연령대 추억 공감 커뮤니티
<br><br><br>
## 기획 의도

1. 세대 간 소통과 연결
   - 각 연령대의 사용자들이 자신의 추억과 경험을 공유하며 공감대를 형성하고, 다른 세대와 소통
   - 세대 간의 이해와 소통을 촉진하여 사회적 통합에 기여 
2. 추억의 보존과 공유
   - 소중한 기억과 추억을 디지털화하여 보존하고, 다른 사람들과 공유
   - 사용자들이 커뮤니티에 더 깊이 참여하고 유대감 형성
3. 사회적 지원 및 교류의 장
   - 같은 연령대의 사용자들이 모여 서로의 경험과 조언을 나누고, 지원할 수 있는 장 마련
   - 외로움을 느끼는 고령자나 공감대를 찾기 어려운 청소년들에게 큰 도움
4. 데이터 분석을 통한 가치 창출
   - 사용자들이 제공하는 데이터를 분석하여 각 연령대의 트렌드와 관심사 파악 
   - 다양한 부가가치를 창출
5. 디지털 포용성과 접근성 증대
   - 연령대별로 맞춤 디자인과 접근성 기능 제공하여 모든 연령대의 사용자가 쉽게 이용
   - 노년층과 같이 기술 사용에 어려움을 겪는 사용자들에게도 접근성 제공
6. 잠재적 비즈니스 기회
   - 특정 연령대의 관심사에 맞춘 광고, 제품 판매 등을 통해 수익 창출
<br><br><br>

## 기술 스택
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)


<br><br><br>

## ERD
![](https://i.imgur.com/1DrhsxS.png)

<br><br><br>

## 시스템 요구사항 명세서
![](https://i.imgur.com/yK79xTB.png)


<br><br><br>


## API
| 내용        | 유형     | URL                                   | 설명                                                      |  
| --------- | ------ | ------------------------------------- | ------------------------------------------------------- |  
| 게시글 등록    | POST   | /posts                                | 게시글 등록.                                                 |
| 게시글 수정    | PATCH  | /posts/{post-id}                      | 게시글 수정.                                                 |
| 게시글 목록 조회 | GET    | /posts                                | 게시글 전체 목록 조회.                                           |
| 게시글 조회    | GET    | /posts/{post-id}                      | 단일 게시글 조회.                                              |
| 게시글 삭제    | DELETE | /posts/{post-id}                      | 게시글을 삭제.                                                |
| 게시글 댓글 등록 | POST   | /posts/{post-id}/reply                | 게시글에 댓글 등록.                                             |
| 게시글 댓글 수정 | PATCH  | /posts/reply/{reply-id}               | 게시글 댓글 수정                                               |
| 게시글 댓글 삭제 | DELETE | /posts/reply/{reply-id}               | 게시글 댓글 삭제                                               |
| 게시글 좋아요   | POST   | /posts/{post-id}/like                 | 게시글에 좋아요 누르기.                                           |
| 투표 등록     | POST   | /balancegames                         | 투표를 등록하는 기능(관리자 전용)                                     |
| 투표 삭제     | DELETE | /balancegames/{balance-game-id}       | 투표 삭제.                                                  |  |
| 투표 수정     | PATCH  | /balancegame/{balance-game-id}        | 투표수정                                                    |  |
| 투표 하기     | POST   | /balancegames/{balance-game-id}/vote  | 원하는 곳에 투표를 하는 기능                                        |
| 투표 목록 조회  | GET    | /balancegames                         | 지나간 투표들 조회.                                             |
| 현재 투표 보기  | GET    | /balancegames/{balance-game-id}       | 지금 투표 보기. (기본 화면)                                       |
| 투표 댓글 달기  | POST   | /balancegames/{balance-game-id}/reply | 투표에 댓글 달기 기능.                                           |
| 투표 댓글 수정  | PATCH  | /balancegames/reply/{reply-id}        | 투표 댓글 수정                                                |
| 투표 댓글 삭제  | DELETE | /balancegames/reply/{reply-id}        | 투표 댓글 삭제                                                |
| 투표 공유     | POST   | /balancegames/{balance-game-id}/share | 투표 공유                                                   |  |
| 회원가입      | POST   | /members                              | 회원이 아이디, 닉네임, 비밀번호, 세대를 입력하여 회원가입.                      |
| 회원정보수정    | PATCH  | /members/{member-id}                  | 회원이 닉네임, 비밀번호를 변경.                                      |
| 회원탈퇴      | DELETE | /members/{member-id}                  | 회원이 탈퇴.(실제로 삭제하진 않고 상태를 변경)                             |
| 로그인       | POST   | /members/login                        | 회원이 로그인.                                                |
| 로그아웃      | POST   | /members/logout                       | 회원이 로그아웃.                                               |
| 회원정보 조회   | GET    | /members/{member-id}                  | 회원 정보 조회                                                |
| 갤러리 등록    | POST   | /photos                               | 갤러리 등록.                                                 |
| 갤러리 수정    | PATCH  | /photos/{photo-id}                    | 갤러리 수정.                                                 |
| 갤러리 삭제    | DELETE | /photos/{photo-id}                    | 갤러리을 삭제.                                                |
| 갤러리 조회    | GET    | /photos/{photo-id}                    | 단일 갤러리 조회.                                              |
| 갤러리 목록 조회 | GET    | /photos                               | 갤러리 전체 목록 조회.                                           |
| 갤러리 댓글 등록 | POST   | /photo/{photo-id}/reply               | 갤러리에 댓글 등록.                                             |
| 갤러리 댓글 수정 | PATCH  | /photos/reply/{reply-id}              | 갤러리 댓글 수정                                               |
| 갤러리 댓글 삭제 | DELETE | /photos/reply/{reply-id}              | 갤러리 댓글 삭제                                               |
| 갤러리 좋아요   | POST   | /photos/{photo-id}/like               | 갤러리에 좋아요 누르기.                                           |
| 이미지 업로드   | POST   | /images                               | 이미지 첨부파일등록                                              |

<br><br><br>

## 프로젝트 인원

|![](https://i.imgur.com/wQh0uO2.png)|![](https://i.imgur.com/ycdATnY.png)|![](https://i.imgur.com/8RQfmpQ.png)|![](https://i.imgur.com/0YqKVim.png)|
|------|---|---|---|
|황해진|방승욱|윤영아|서진형|
|-팀장<br>-프론트앤드<br>(세대별 메인 화면, 일반+사진 게시판 목록)<br>-백앤드 보조<br>(이미지 업로드, 공유, 가입, 로그인)<br>-S3,RDS,EC2 연결 및 배포|-팀원<br>-프론트앤드<br>(투표 작성, 조회, 게시글 조회)|-팀원<br>-백앤드<br>(사진첩·일반게시판기능 구현)|-팀원<br>-백앤드<br>(멤버·투표 기능 구현, 전체적 백앤드 기능 수정)<br>-시큐리티 기능별 전체 적용<br>|

<br><br><br>
## 주요 화면

### 메인화면
![](https://i.imgur.com/J3G03rq.png)

### 회원가입 화면
![](https://i.imgur.com/9lkIytl.png)

### 사진 게시판 화면(8090)
![](https://i.imgur.com/jIJUHrZ.png)

### 일반 게시판 화면(0010)
![](https://i.imgur.com/i7yPEoU.png)

### 금주 투표 화면(0010)
![](https://i.imgur.com/BKti1MU.png)

### 사진 게시판 글작성 화면(9000)
![](https://i.imgur.com/JUrFKYr.png)

### 사진 게시판 화면(9000)
![](https://i.imgur.com/pJ9a9WC.png)


