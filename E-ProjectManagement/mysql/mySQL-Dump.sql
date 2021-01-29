-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 29. Jan 2021 um 04:12
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
-- Erstellt am: 16. Jan 2021 um 22:44
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
(500, '2021-01-15 20:07:29', 'stdsfg', 'string'),
(501, '2021-01-15 20:07:29', 'MM', 'DDSR'),
(502, '2021-01-16 11:14:10', 'strdfg', 'stgfrng');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `participation`
--
-- Erstellt am: 16. Jan 2021 um 22:44
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
-- Erstellt am: 29. Jan 2021 um 03:10
-- Zuletzt aktualisiert: 29. Jan 2021 um 03:10
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
(0, '0000-00-00 00:00:00', 'Chef', 3, '', ''),
(63, '0000-00-00 00:00:00', 'alex', 1, '', ''),
(123, '0000-00-00 00:00:00', 'ghg', 2, '', ''),
(143, '0000-00-00 00:00:00', 'ali', 3, '', ''),
(145, '0000-00-00 00:00:00', 'Yasemin', 1, '', ''),
(146, '0000-00-00 00:00:00', 'strtg', 2, '', ''),
(147, '0000-00-00 00:00:00', 'Christoph', 2, '', ''),
(148, '2021-01-20 21:29:59', 'Christoph', 2, '', '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `project`
--
-- Erstellt am: 23. Jan 2021 um 21:24
-- Zuletzt aktualisiert: 29. Jan 2021 um 02:31
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
(4002, '2021-01-29 02:14:37', 5, 5, 'sttting', 'reer', 4, 6, 6, 4, 6, 'stri44ng', 'st34ring', 1, 1, 'BAS', 'str33ing', 5, 3),
(4004, '2021-01-29 02:31:11', 0, 0, 'stfng', 'string', 0, 0, 0, 0, 0, 'string', 'string', 1, 0, 'Test', 'string', 0, 4),
(4005, '2021-01-16 19:08:50', 0, 0, 'stfng', 'string', 0, 0, 0, 0, 0, 'string', 'string', 1, 1, 'Test2', 'string', 0, 4),
(4006, '2021-01-28 23:03:07', 1, 2, '3', '4', 5, 6, 9, 8, 7, '4', '5', 1, 1, 'SW-Projekt', 'SW-Projekt', 8, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `project_type`
--
-- Erstellt am: 16. Jan 2021 um 22:44
-- Zuletzt aktualisiert: 29. Jan 2021 um 02:47
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
(3, '2021-01-29 02:46:46', 'Interdisziplinäres Projekt', 4, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rating`
--
-- Erstellt am: 16. Jan 2021 um 22:44
--

DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `creation_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `project` int(11) NOT NULL,
  `passed` tinyint(4) DEFAULT NULL,
  `grade` double DEFAULT NULL,
  `evaluator` int(10) NOT NULL,
  `to_be_assessed` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `rating`
--

INSERT INTO `rating` (`id`, `creation_time`, `project`, `passed`, `grade`, `evaluator`, `to_be_assessed`) VALUES
(1414, '0000-00-00 00:00:00', 0, 1, 2, 123, 1),
(1415, '0000-00-00 00:00:00', 4000, 1, 0, 0, 0),
(1416, '2021-01-16 19:40:30', 4600, 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `role`
--
-- Erstellt am: 16. Jan 2021 um 22:44
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
-- Erstellt am: 16. Jan 2021 um 22:44
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
(2024, '2021-01-16 21:18:36', '2021-01-16', '2021-01-16', 'Testg');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `student`
--
-- Erstellt am: 16. Jan 2021 um 22:44
-- Zuletzt aktualisiert: 29. Jan 2021 um 03:11
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
(1, '0000-00-00 00:00:00', 'Sebbi', 6565, 'WI'),
(43, '2021-01-16 20:20:13', 'Alex', 2342, 'WI'),
(44, '2021-01-16 20:20:13', 'Wilbert', 12345, 'OMM');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT für Tabelle `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4007;

--
-- AUTO_INCREMENT für Tabelle `project_type`
--
ALTER TABLE `project_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1417;

--
-- AUTO_INCREMENT für Tabelle `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT für Tabelle `semester`
--
ALTER TABLE `semester`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2025;
COMMIT;
