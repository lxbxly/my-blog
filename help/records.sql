/*
 Navicat Premium Dump SQL

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 90100 (9.1.0)
 Source Host           : localhost:3306
 Source Schema         : worktimes

 Target Server Type    : MySQL
 Target Server Version : 90100 (9.1.0)
 File Encoding         : 65001

 Date: 08/11/2024 22:10:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for records
-- ----------------------------
DROP TABLE IF EXISTS `records`;
CREATE TABLE `records`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `checkIn` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `checkOut` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `workHours` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of records
-- ----------------------------
INSERT INTO `records` VALUES (1, '2024-11-01', '2024-11-01 08:29:25', '2024-11-01 17:35:37', '欠工时 (0小时30分钟)', '-0:30');
INSERT INTO `records` VALUES (2, '2024-11-04', '2024-11-04 08:36:10', '2024-11-04 17:47:41', '欠工时 (0小时37分钟)', '-0:37');
INSERT INTO `records` VALUES (3, '2024-11-05', '2024-11-05 08:35:31', '2024-11-05 22:00:13', '加班 (3小时24分钟)', '3:24');
INSERT INTO `records` VALUES (4, '2024-11-06', '2024-11-06 08:25:57', '2024-11-06 17:47:27', '欠工时 (0小时26分钟)', '-0:26');
INSERT INTO `records` VALUES (5, '2024-11-07', '2024-11-07 08:29:00', '2024-11-07 18:07:21', '欠工时 (0小时22分钟)', '-0:22');
INSERT INTO `records` VALUES (10, '2024-11-08', '2024-11-08 08:30:36', '2024-11-08 17:45:06', '欠工时 (0小时31分钟)', '-0:31');

SET FOREIGN_KEY_CHECKS = 1;
