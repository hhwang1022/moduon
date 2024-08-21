INSERT INTO member (email, password, nickname, member_status, member_generation, voting_rights, login_date, share_date, share_count, created_at, last_modified_at)
VALUES
('user1@example.com', 'password1', 'nickname1', 'MEMBER_ACTIVE', 'GENERATION_8090',  10, '2024-08-01', '2024-08-05', 2, NOW(), NOW()),
('user2@example.com', 'password2', 'nickname2', 'MEMBER_ACTIVE', 'GENERATION_9000', 15, '2024-08-02', '2024-08-06', 3, NOW(), NOW()),
('user3@example.com', 'password3', 'nickname3', 'MEMBER_SLEEP', 'GENERATION_0010',  5, '2024-08-03', '2024-08-07', 1, NOW(), NOW()),
('user4@example.com', 'password4', 'nickname4', 'MEMBER_QUIT', 'GENERATION_1020', 20, '2024-08-04', '2024-08-08', 4, NOW(), NOW()),
('user5@example.com', 'password5', 'nickname5', 'MEMBER_ACTIVE', 'GENERATION_8090', 30, '2024-08-05', '2024-08-09', 5, NOW(), NOW()),
('user6@example.com', 'password6', 'nickname6', 'MEMBER_SLEEP', 'GENERATION_9000', 25, '2024-08-06', '2024-08-10', 3, NOW(), NOW()),
('user7@example.com', 'password7', 'nickname7', 'MEMBER_QUIT', 'GENERATION_0010', 10, '2024-08-07', '2024-08-11', 2, NOW(), NOW()),
('user8@example.com', 'password8', 'nickname8', 'MEMBER_ACTIVE', 'GENERATION_1020', 40, '2024-08-08', '2024-08-12', 6, NOW(), NOW()),
('user9@example.com', 'password9', 'nickname9', 'MEMBER_SLEEP', 'GENERATION_8090', 50, '2024-08-09', '2024-08-13', 4, NOW(), NOW()),
('user10@example.com', 'password10', 'nickname10', 'MEMBER_ACTIVE', 'GENERATION_9000', 60, '2024-08-10', '2024-08-14', 7, NOW(), NOW());

INSERT INTO photo (PHOTO_ID, BODY, CATEGORY, CREATED_AT, IMAGE1, IMAGE2, IMAGE3, IMAGE4, IMAGE5, IS_NOTICE, LIKE_COUNT, TITLE, VIEW, MEMBER_ID) VALUES
(1, 'Sample body content 1', 'CATEGORY_8090', '2024-08-21 10:00:00', 'image1_1.jpg', 'image2_1.jpg', 'image3_1.jpg', 'image4_1.jpg', 'image5_1.jpg', 'Y', 5, 'Sample Title 1', 10, 1),
(2, 'Sample body content 2', 'CATEGORY_9000', '2024-08-20 10:00:00', 'image1_2.jpg', 'image2_2.jpg', 'image3_2.jpg', 'image4_2.jpg', 'image5_2.jpg', 'N', 3, 'Sample Title 2', 20, 2),
(3, 'Sample body content 3', 'CATEGORY_0010', '2024-08-19 10:00:00', 'image1_3.jpg', 'image2_3.jpg', 'image3_3.jpg', 'image4_3.jpg', 'image5_3.jpg', 'Y', 15, 'Sample Title 3', 30, 3),
(4, 'Sample body content 4', 'CATEGORY_1020', '2024-08-18 10:00:00', 'image1_4.jpg', 'image2_4.jpg', 'image3_4.jpg', 'image4_4.jpg', 'image5_4.jpg', 'N', 10, 'Sample Title 4', 40, 4),
(5, 'Sample body content 5', 'CATEGORY_8090', '2024-08-17 10:00:00', 'image1_5.jpg', 'image2_5.jpg', 'image3_5.jpg', 'image4_5.jpg', 'image5_5.jpg', 'Y', 8, 'Sample Title 5', 50, 5),
(6, 'Sample body content 6', 'CATEGORY_9000', '2024-08-16 10:00:00', 'image1_6.jpg', 'image2_6.jpg', 'image3_6.jpg', 'image4_6.jpg', 'image5_6.jpg', 'N', 6, 'Sample Title 6', 60, 1),
(7, 'Sample body content 7', 'CATEGORY_0010', '2024-08-15 10:00:00', 'image1_7.jpg', 'image2_7.jpg', 'image3_7.jpg', 'image4_7.jpg', 'image5_7.jpg', 'Y', 12, 'Sample Title 7', 70, 2),
(8, 'Sample body content 8', 'CATEGORY_1020', '2024-08-14 10:00:00', 'image1_8.jpg', 'image2_8.jpg', 'image3_8.jpg', 'image4_8.jpg', 'image5_8.jpg', 'N', 9, 'Sample Title 8', 80, 3),
(9, 'Sample body content 9', 'CATEGORY_8090', '2024-08-13 10:00:00', 'image1_9.jpg', 'image2_9.jpg', 'image3_9.jpg', 'image4_9.jpg', 'image5_9.jpg', 'Y', 7, 'Sample Title 9', 90, 4),
(10, 'Sample body content 10', 'CATEGORY_9000', '2024-08-12 10:00:00', 'image1_10.jpg', 'image2_10.jpg', 'image3_10.jpg', 'image4_10.jpg', 'image5_10.jpg', 'N', 11, 'Sample Title 10', 100, 5),

(11, 'Sample body content 11', 'CATEGORY_0010', '2024-08-11 10:00:00', 'image1_11.jpg', 'image2_11.jpg', 'image3_11.jpg', 'image4_11.jpg', 'image5_11.jpg', 'Y', 4, 'Sample Title 11', 110, 1),
(12, 'Sample body content 12', 'CATEGORY_1020', '2024-08-10 10:00:00', 'image1_12.jpg', 'image2_12.jpg', 'image3_12.jpg', 'image4_12.jpg', 'image5_12.jpg', 'N', 13, 'Sample Title 12', 120, 2),
(13, 'Sample body content 13', 'CATEGORY_8090', '2024-08-09 10:00:00', 'image1_13.jpg', 'image2_13.jpg', 'image3_13.jpg', 'image4_13.jpg', 'image5_13.jpg', 'Y', 14, 'Sample Title 13', 130, 3),
(14, 'Sample body content 14', 'CATEGORY_9000', '2024-08-08 10:00:00', 'image1_14.jpg', 'image2_14.jpg', 'image3_14.jpg', 'image4_14.jpg', 'image5_14.jpg', 'N', 16, 'Sample Title 14', 140, 4),
(15, 'Sample body content 15', 'CATEGORY_0010', '2024-08-07 10:00:00', 'image1_15.jpg', 'image2_15.jpg', 'image3_15.jpg', 'image4_15.jpg', 'image5_15.jpg', 'Y', 18, 'Sample Title 15', 150, 5),
(16, 'Sample body content 16', 'CATEGORY_1020', '2024-08-06 10:00:00', 'image1_16.jpg', 'image2_16.jpg', 'image3_16.jpg', 'image4_16.jpg', 'image5_16.jpg', 'N', 17, 'Sample Title 16', 160, 1),
(17, 'Sample body content 17', 'CATEGORY_8090', '2024-08-05 10:00:00', 'image1_17.jpg', 'image2_17.jpg', 'image3_17.jpg', 'image4_17.jpg', 'image5_17.jpg', 'Y', 19, 'Sample Title 17', 170, 2),
(18, 'Sample body content 18', 'CATEGORY_9000', '2024-08-04 10:00:00', 'image1_18.jpg', 'image2_18.jpg', 'image3_18.jpg', 'image4_18.jpg', 'image5_18.jpg', 'N', 22, 'Sample Title 18', 180, 3),
(19, 'Sample body content 19', 'CATEGORY_0010', '2024-08-03 10:00:00', 'image1_19.jpg', 'image2_19.jpg', 'image3_19.jpg', 'image4_19.jpg', 'image5_19.jpg', 'Y', 21, 'Sample Title 19', 190, 4),
(20, 'Sample body content 20', 'CATEGORY_1020', '2024-08-02 10:00:00', 'image1_20.jpg', 'image2_20.jpg', 'image3_20.jpg', 'image4_20.jpg', 'image5_20.jpg', 'N', 25, 'Sample Title 20', 200, 5),

(21, 'Sample body content 21', 'CATEGORY_8090', '2024-08-01 10:00:00', 'image1_21.jpg', 'image2_21.jpg', 'image3_21.jpg', 'image4_21.jpg', 'image5_21.jpg', 'Y', 20, 'Sample Title 21', 210, 1),
(22, 'Sample body content 22', 'CATEGORY_9000', '2024-07-31 10:00:00', 'image1_22.jpg', 'image2_22.jpg', 'image3_22.jpg', 'image4_22.jpg', 'image5_22.jpg', 'N', 23, 'Sample Title 22', 220, 2),
(23, 'Sample body content 23', 'CATEGORY_0010', '2024-07-30 10:00:00', 'image1_23.jpg', 'image2_23.jpg', 'image3_23.jpg', 'image4_23.jpg', 'image5_23.jpg', 'Y', 26, 'Sample Title 23', 230, 3);

INSERT INTO post (POST_ID, BODY, CATEGORY, CREATED_AT, IMAGE1, IMAGE2, IMAGE3, IMAGE4, IMAGE5, IS_NOTICE, LIKE_COUNT, TITLE, VIEW, MEMBER_ID) VALUES
(1, 'Sample body content 1', 'CATEGORY_8090', '2024-08-21 10:00:00', 'image1_1.jpg', 'image2_1.jpg', 'image3_1.jpg', 'image4_1.jpg', 'image5_1.jpg', 'Y', 5, 'Sample Title 1', 10, 1),
(2, 'Sample body content 2', 'CATEGORY_9000', '2024-08-20 10:00:00', 'image1_2.jpg', 'image2_2.jpg', 'image3_2.jpg', 'image4_2.jpg', 'image5_2.jpg', 'N', 3, 'Sample Title 2', 20, 2),
(3, 'Sample body content 3', 'CATEGORY_0010', '2024-08-19 10:00:00', 'image1_3.jpg', 'image2_3.jpg', 'image3_3.jpg', 'image4_3.jpg', 'image5_3.jpg', 'Y', 15, 'Sample Title 3', 30, 3),
(4, 'Sample body content 4', 'CATEGORY_1020', '2024-08-18 10:00:00', 'image1_4.jpg', 'image2_4.jpg', 'image3_4.jpg', 'image4_4.jpg', 'image5_4.jpg', 'N', 10, 'Sample Title 4', 40, 4),
(5, 'Sample body content 5', 'CATEGORY_8090', '2024-08-17 10:00:00', 'image1_5.jpg', 'image2_5.jpg', 'image3_5.jpg', 'image4_5.jpg', 'image5_5.jpg', 'Y', 8, 'Sample Title 5', 50, 5),
(6, 'Sample body content 6', 'CATEGORY_9000', '2024-08-16 10:00:00', 'image1_6.jpg', 'image2_6.jpg', 'image3_6.jpg', 'image4_6.jpg', 'image5_6.jpg', 'N', 6, 'Sample Title 6', 60, 1),
(7, 'Sample body content 7', 'CATEGORY_0010', '2024-08-15 10:00:00', 'image1_7.jpg', 'image2_7.jpg', 'image3_7.jpg', 'image4_7.jpg', 'image5_7.jpg', 'Y', 12, 'Sample Title 7', 70, 2),
(8, 'Sample body content 8', 'CATEGORY_1020', '2024-08-14 10:00:00', 'image1_8.jpg', 'image2_8.jpg', 'image3_8.jpg', 'image4_8.jpg', 'image5_8.jpg', 'N', 9, 'Sample Title 8', 80, 3),
(9, 'Sample body content 9', 'CATEGORY_8090', '2024-08-13 10:00:00', 'image1_9.jpg', 'image2_9.jpg', 'image3_9.jpg', 'image4_9.jpg', 'image5_9.jpg', 'Y', 7, 'Sample Title 9', 90, 4),
(10, 'Sample body content 10', 'CATEGORY_9000', '2024-08-12 10:00:00', 'image1_10.jpg', 'image2_10.jpg', 'image3_10.jpg', 'image4_10.jpg', 'image5_10.jpg', 'N', 11, 'Sample Title 10', 100, 5),

(11, 'Sample body content 11', 'CATEGORY_0010', '2024-08-11 10:00:00', 'image1_11.jpg', 'image2_11.jpg', 'image3_11.jpg', 'image4_11.jpg', 'image5_11.jpg', 'Y', 4, 'Sample Title 11', 110, 1),
(12, 'Sample body content 12', 'CATEGORY_1020', '2024-08-10 10:00:00', 'image1_12.jpg', 'image2_12.jpg', 'image3_12.jpg', 'image4_12.jpg', 'image5_12.jpg', 'N', 13, 'Sample Title 12', 120, 2),
(13, 'Sample body content 13', 'CATEGORY_8090', '2024-08-09 10:00:00', 'image1_13.jpg', 'image2_13.jpg', 'image3_13.jpg', 'image4_13.jpg', 'image5_13.jpg', 'Y', 14, 'Sample Title 13', 130, 3),
(14, 'Sample body content 14', 'CATEGORY_9000', '2024-08-08 10:00:00', 'image1_14.jpg', 'image2_14.jpg', 'image3_14.jpg', 'image4_14.jpg', 'image5_14.jpg', 'N', 16, 'Sample Title 14', 140, 4),
(15, 'Sample body content 15', 'CATEGORY_0010', '2024-08-07 10:00:00', 'image1_15.jpg', 'image2_15.jpg', 'image3_15.jpg', 'image4_15.jpg', 'image5_15.jpg', 'Y', 18, 'Sample Title 15', 150, 5),
(16, 'Sample body content 16', 'CATEGORY_1020', '2024-08-06 10:00:00', 'image1_16.jpg', 'image2_16.jpg', 'image3_16.jpg', 'image4_16.jpg', 'image5_16.jpg', 'N', 17, 'Sample Title 16', 160, 1),
(17, 'Sample body content 17', 'CATEGORY_8090', '2024-08-05 10:00:00', 'image1_17.jpg', 'image2_17.jpg', 'image3_17.jpg', 'image4_17.jpg', 'image5_17.jpg', 'Y', 19, 'Sample Title 17', 170, 2),
(18, 'Sample body content 18', 'CATEGORY_9000', '2024-08-04 10:00:00', 'image1_18.jpg', 'image2_18.jpg', 'image3_18.jpg', 'image4_18.jpg', 'image5_18.jpg', 'N', 22, 'Sample Title 18', 180, 3),
(19, 'Sample body content 19', 'CATEGORY_0010', '2024-08-03 10:00:00', 'image1_19.jpg', 'image2_19.jpg', 'image3_19.jpg', 'image4_19.jpg', 'image5_19.jpg', 'Y', 21, 'Sample Title 19', 190, 4),
(20, 'Sample body content 20', 'CATEGORY_1020', '2024-08-02 10:00:00', 'image1_20.jpg', 'image2_20.jpg', 'image3_20.jpg', 'image4_20.jpg', 'image5_20.jpg', 'N', 25, 'Sample Title 20', 200, 5),

(21, 'Sample body content 21', 'CATEGORY_8090', '2024-08-01 10:00:00', 'image1_21.jpg', 'image2_21.jpg', 'image3_21.jpg', 'image4_21.jpg', 'image5_21.jpg', 'Y', 20, 'Sample Title 21', 210, 1),
(22, 'Sample body content 22', 'CATEGORY_9000', '2024-07-31 10:00:00', 'image1_22.jpg', 'image2_22.jpg', 'image3_22.jpg', 'image4_22.jpg', 'image5_22.jpg', 'N', 23, 'Sample Title 22', 220, 2),
(23, 'Sample body content 23', 'CATEGORY_0010', '2024-07-30 10:00:00', 'image1_23.jpg', 'image2_23.jpg', 'image3_23.jpg', 'image4_23.jpg', 'image5_23.jpg', 'Y', 26, 'Sample Title 23', 230, 3);