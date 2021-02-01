-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 01. Feb 2021 um 23:03
-- Server-Version: 10.4.17-MariaDB
-- PHP-Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Datenbank: `sw-project`
--
CREATE DATABASE IF NOT EXISTS `sw-project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `sw-project`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `module`
--

DROP TABLE IF EXISTS `module`;
CREATE TABLE `module` (
                          `id` int(50) NOT NULL,
                          `creation_time` timestamp NOT NULL DEFAULT current_timestamp(),
                          `name` varchar(50) NOT NULL,
                          `edv_nr` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `module`
--

INSERT INTO `module` (`id`, `creation_time`, `name`, `edv_nr`) VALUES
(300, '2021-01-15 20:07:29', 'IT-Projekt', '5000'),
(500, '2021-01-15 20:07:29', 'KMP', 'string'),
(501, '2021-01-15 20:07:29', 'MM', 'DDSR'),
(502, '2021-01-16 11:14:10', 'strdfg', 'stgfrng'),
(504, '2021-01-29 14:08:00', 'Sayo123', 'afwaa'),
(505, '2021-01-29 16:07:53', 'krank123', '2'),
(506, '2021-01-29 16:49:49', 'mathe1', '1');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `participation`
--

DROP TABLE IF EXISTS `participation`;
CREATE TABLE `participation` (
                                 `id` int(11) NOT NULL,
                                 `creation_time` datetime NOT NULL DEFAULT current_timestamp(),
                                 `project` int(11) NOT NULL,
                                 `student` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `participation`
--

INSERT INTO `participation` (`id`, `creation_time`, `project`, `student`) VALUES
(0, '2021-01-20 22:32:38', 4001, 43),
(12, '2021-01-20 22:33:18', 2, 2),
(27, '2021-01-15 21:08:27', 4000, 3),
(28, '2021-01-15 21:08:27', 0, 1),
(29, '2021-01-15 21:08:27', 4, 1),
(30, '2021-01-15 21:08:27', 0, 1),
(31, '2021-01-15 21:08:27', 14, 12),
(32, '2021-01-15 21:08:27', 0, 1000),
(33, '2021-01-15 21:08:27', 90, 1000),
(34, '2021-01-15 21:08:27', 90, 1000),
(35, '2021-01-15 21:08:27', 90, 1000),
(5000, '2021-01-15 21:08:27', 91, 1002),
(5001, '2021-01-16 12:22:41', 6, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `person`
--

DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
                          `id` int(11) NOT NULL,
                          `creation_time` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'neu',
                          `name` varchar(45) NOT NULL,
                          `role` int(11) NOT NULL,
                          `email` varchar(256) NOT NULL,
                          `google_user_id` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `person`
--

INSERT INTO `person` (`id`, `creation_time`, `name`, `role`, `email`, `google_user_id`) VALUES
(63, '2021-01-31 14:14:36', 'günter', 2, 'gütnet@gmail.com', 'string'),
(123, '0000-00-00 00:00:00', 'ghg', 2, '', ''),
(143, '0000-00-00 00:00:00', 'ali', 3, '', ''),
(145, '0000-00-00 00:00:00', 'Yasemin', 1, '', ''),
(146, '0000-00-00 00:00:00', 'strtg', 2, '', ''),
(147, '0000-00-00 00:00:00', 'Christoph', 2, '', ''),
(148, '2021-01-20 21:29:59', 'Christoph', 2, '', ''),
(150, '2021-01-31 14:05:25', 'saeid', 2, 'mustermann@gmail.com', '2'),
(154, '2021-01-31 23:43:29', 'saeid123', 1, 'afd@', ''),
(155, '2021-01-31 23:43:49', 'saeid921414', 1, 'Saeid@', '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `project`
--

DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
                           `id` int(11) NOT NULL,
                           `creation_time` timestamp NOT NULL DEFAULT current_timestamp(),
                           `semester` int(11) NOT NULL,
                           `module` int(11) NOT NULL,
                           `short_description` mediumtext NOT NULL,
                           `external_partner_list` varchar(45) NOT NULL,
                           `capacity` int(11) NOT NULL,
                           `bd_during_exam_period` int(11) NOT NULL,
                           `bd_before_lecture_period` int(11) NOT NULL,
                           `bd_during_lecture_period` int(11) NOT NULL,
                           `preferred_bd_during_lecture_period` int(11) NOT NULL,
                           `language` varchar(45) NOT NULL,
                           `room` varchar(45) NOT NULL,
                           `special_room` tinyint(5) NOT NULL,
                           `flag` tinyint(1) NOT NULL,
                           `name` varchar(45) NOT NULL,
                           `status` varchar(45) NOT NULL,
                           `project_type` int(10) NOT NULL,
                           `owner` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `project`
--

INSERT INTO `project` (`id`, `creation_time`, `semester`, `module`, `short_description`, `external_partner_list`, `capacity`, `bd_during_exam_period`, `bd_before_lecture_period`, `bd_during_lecture_period`, `preferred_bd_during_lecture_period`, `language`, `room`, `special_room`, `flag`, `name`, `status`, `project_type`, `owner`) VALUES
(4006, '2021-01-28 23:03:07', 1, 2, '3', '4', 5, 6, 9, 8, 7, '4', '5', 1, 1, 'SW-Projekt', 'SW-Projekt', 8, 5),
(4007, '2021-02-01 14:58:22', 0, 0, 'string', 'string', 0, 0, 0, 0, 0, 'string', 'string', 1, 1, 'projekt1d2rq2r', 'string', 0, 0),
(4008, '2021-02-01 14:58:22', 0, 0, 'string', 'string', 0, 1, 1, 2, 3, 'string', 'string', 1, 1, 'projekt1d2rq2r', 'string', 0, 0),
(4009, '2021-02-01 14:58:22', 0, 0, 'string', 'string', 0, 1, 1, 2, 3, 'string', 'string', 1, 1, 'projekt1d2rq2r', 'string', 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `project_type`
--

DROP TABLE IF EXISTS `project_type`;
CREATE TABLE `project_type` (
                                `id` int(11) NOT NULL,
                                `creation_time` timestamp NOT NULL DEFAULT current_timestamp(),
                                `name` varchar(45) NOT NULL,
                                `sws` int(11) NOT NULL,
                                `ects` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `project_type`
--

INSERT INTO `project_type` (`id`, `creation_time`, `name`, `sws`, `ects`) VALUES
(1, '2021-01-05 02:46:01', 'Fachspezifisches Projekt', 3, 5),
(2, '2021-01-29 02:46:08', 'Transdisziplinäres Projekt', 2, 3),
(3, '2021-01-29 02:46:46', 'Interdisziplinäres Projekt', 4, 5),
(4, '2021-01-29 13:18:29', 'Sayo', 2, 2),
(5, '2021-01-29 16:49:32', 'hanso', 1, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rating`
--

DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating` (
                          `id` int(11) NOT NULL,
                          `creation_time` timestamp NOT NULL DEFAULT current_timestamp(),
                          `project` int(11) NOT NULL,
                          `passed` tinyint(5) DEFAULT NULL,
                          `grade` float DEFAULT NULL,
                          `evaluator` int(10) NOT NULL,
                          `to_be_assessed` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `rating`
--

INSERT INTO `rating` (`id`, `creation_time`, `project`, `passed`, `grade`, `evaluator`, `to_be_assessed`) VALUES
(1414, '0000-00-00 00:00:00', 0, 1, 2, 123, 1),
(1415, '0000-00-00 00:00:00', 4000, 1, 0, 0, 0),
(1416, '2021-01-16 19:40:30', 4600, 1, 0, 0, 0),
(1417, '2021-01-29 20:24:11', 0, 0, 2, 2, 2),
(1418, '2021-01-31 22:18:28', 0, 3, 2, 1, 2),
(1419, '2021-01-31 22:20:53', 1, 1, 4, 2, 3),
(1420, '2021-01-31 22:25:18', 3, 2, 3, 3, 3),
(1421, '2021-01-31 22:26:58', 1, 1, 1, 1, 1),
(1422, '2021-01-31 22:28:50', 1, 0, 4, 2, 3),
(1423, '2021-02-01 16:49:02', 0, 0, 2, 1, 2),
(1424, '2021-02-01 16:56:45', 0, 0, 1, 2, 2),
(1425, '2021-02-01 16:57:16', 1, 0, 1, 2, 2),
(1426, '2021-02-01 16:57:46', 3, 0, 1, 1, 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
                        `id` int(11) NOT NULL,
                        `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'dozent'),
(2, 'student'),
(3, 'admin'),
(4, 'Test');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `semester`
--

DROP TABLE IF EXISTS `semester`;
CREATE TABLE `semester` (
                            `id` int(11) NOT NULL,
                            `creation_time` datetime NOT NULL DEFAULT current_timestamp(),
                            `start` date DEFAULT NULL,
                            `end` date DEFAULT NULL,
                            `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `semester`
--

INSERT INTO `semester` (`id`, `creation_time`, `start`, `end`, `name`) VALUES
(2020, '0000-00-00 00:00:00', '2020-12-01', '2020-12-18', 'WS20'),
(2021, '0000-00-00 00:00:00', '2020-12-20', '2020-12-25', 'SS21'),
(2022, '0000-00-00 00:00:00', '2021-01-16', '2021-01-16', 'test2'),
(2023, '2021-01-16 21:02:34', '2021-01-16', '2021-01-16', 'test3'),
(2024, '2021-01-16 21:18:36', '2021-01-16', '2021-01-16', 'Testg'),
(2025, '2021-01-29 12:54:24', '2021-01-14', '2021-01-05', 'ss'),
(2026, '2021-01-29 13:09:06', '2021-01-16', '2021-01-13', 'WI7'),
(2027, '2021-01-29 14:20:31', '2021-01-09', '2021-01-13', 'krass'),
(2028, '2021-01-29 15:48:21', '2021-01-13', '2021-01-12', 'maaan'),
(2029, '2021-01-29 17:49:21', '2021-01-07', '2021-01-21', 'hs');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
                           `id` int(11) NOT NULL,
                           `creation_time` timestamp NOT NULL DEFAULT current_timestamp(),
                           `name` varchar(10) NOT NULL,
                           `matriculation_nr` int(10) NOT NULL,
                           `course_abbr` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `student`
--

INSERT INTO `student` (`id`, `creation_time`, `name`, `matriculation_nr`, `course_abbr`) VALUES
(1, '2021-01-29 11:07:53', 'Seb12', 6565, 'WI'),
(43, '2021-01-16 20:20:13', 'Alex', 2342, 'WI'),
(44, '2021-01-16 20:20:13', 'Wilbert', 12345, 'OMM'),
(45, '2021-01-31 14:22:06', 'ali123', 0, 'string'),
(46, '2021-01-31 23:08:20', 'hans', 12, 'ps');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `module`
--
ALTER TABLE `module`
    ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `participation`
--
ALTER TABLE `participation`
    ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `person`
--
ALTER TABLE `person`
    ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `project`
--
ALTER TABLE `project`
    ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `project_type`
--
ALTER TABLE `project_type`
    ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `rating`
--
ALTER TABLE `rating`
    ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `role`
--
ALTER TABLE `role`
    ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `semester`
--
ALTER TABLE `semester`
    ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `student`
--
ALTER TABLE `student`
    ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `person`
--
ALTER TABLE `person`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;

--
-- AUTO_INCREMENT für Tabelle `project`
--
ALTER TABLE `project`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4010;

--
-- AUTO_INCREMENT für Tabelle `project_type`
--
ALTER TABLE `project_type`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `rating`
--
ALTER TABLE `rating`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1427;

--
-- AUTO_INCREMENT für Tabelle `role`
--
ALTER TABLE `role`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT für Tabelle `semester`
--
ALTER TABLE `semester`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2030;
COMMIT;
