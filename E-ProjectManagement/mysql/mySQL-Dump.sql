-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 07. Feb 2021 um 19:38
-- Server-Version: 10.4.17-MariaDB
-- PHP-Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `sw-project`
--
CREATE DATABASE IF NOT EXISTS `sw-project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `sw-project`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `module`
--

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
(0, '2021-01-20 22:32:38', 4002, 150),
(12, '2021-01-20 22:33:18', 4002, 152),
(27, '2021-01-15 21:08:27', 4005, 150),
(28, '2021-01-15 21:08:27', 4005, 151),
(29, '2021-01-15 21:08:27', 4005, 152),
(30, '2021-01-15 21:08:27', 4005, 153),
(31, '2021-01-15 21:08:27', 4005, 154),
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
(143, '0000-00-00 00:00:00', 'ali', 3, '', ''),
(145, '0000-00-00 00:00:00', 'Yasemin', 1, '', ''),
(146, '0000-00-00 00:00:00', 'strtg', 2, '', ''),
(147, '0000-00-00 00:00:00', 'Christoph', 2, '', ''),
(148, '2021-01-20 21:29:59', 'Christoph', 2, '', ''),
(150, '2021-02-06 02:08:31', 'Tom Schenk', 3, 'schenk.tom.pfullingen@gmail.com', '1vXEDbHdIaYckJ5p0wlrCfxzr0J3'),
(151, '2021-02-07 18:31:18', 'Yasemin', 1, 'acikyurek.yasemin@gmail.com', 'ZgM8KuJ7HGTwbQCTaimS4bXKrmg1'),
(152, '2021-02-07 18:31:36', 'Ekrem', 1, 'ekofreezy32@gmail.com', '84aehB7MnzbfzF1JsFVXyU9Lfiy2'),
(153, '2021-02-07 18:31:54', 'Saeid', 1, 'saeid.zadran19@gmail.com', '5li2NPsjqoTyuHULGHSuVqR0nB43'),
(154, '2021-02-07 18:34:06', 'Henry Tran', 1, 'henrytran43@gmail.com', 'WDNidbBfM6RwtC2NVm14BdyFviI2');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `project`
--

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
(4002, '2021-01-29 02:14:37', 5, 5, 'Test Tom', 'reer', 4, 6, 6, 4, 6, 'de', 'st34123', 1, 1, 'Betriebliche Anwendungssysteme', 'offen', 5, 150),
(4004, '2021-01-29 02:31:11', 0, 0, 'stfng', 'string', 0, 0, 0, 0, 0, 'string', 'string', 1, 1, 'Test1234567890', 'string', 0, 150),
(4005, '2021-01-16 19:08:50', 0, 0, 'stfng', 'string', 0, 0, 0, 0, 0, 'string', 'string', 1, 0, 'Test2', 'string', 0, 150),
(4006, '2021-01-28 23:03:07', 1, 2, '3', '4', 5, 6, 9, 8, 7, '4', '5', 1, 1, 'SW-Projekt', 'SW-Projekt', 8, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `project_type`
--

CREATE TABLE `project_type` (
  `id` int(11) NOT NULL,
  `creation_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(45) NOT NULL,
  `sws` varchar(128) NOT NULL,
  `ects` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `project_type`
--

INSERT INTO `project_type` (`id`, `creation_time`, `name`, `sws`, `ects`) VALUES
(1, '2021-01-05 02:46:01', 'Fachspezifisches Projekt', '3', '5'),
(2, '2021-01-29 02:46:08', 'Transdisziplinäres Projekt', '2', '3'),
(3, '2021-01-29 02:46:46', 'Interdisziplinäres Projekt', '4', '5');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rating`
--

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
(1414, '0000-00-00 00:00:00', 4004, 1, 1.5, 150, 1),
(1415, '0000-00-00 00:00:00', 4005, 1, 5, 150, 0),
(1416, '2021-01-16 19:40:30', 4002, 1, 2.3, 150, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `role`
--

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

CREATE TABLE `semester` (
  `id` int(11) NOT NULL,
  `creation_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `semester`
--

INSERT INTO `semester` (`id`, `creation_time`, `start`, `end`, `name`) VALUES
(2020, '2021-01-29 03:40:45', '2020-12-26', '2021-01-29', 'WS20'),
(2021, '0000-00-00 00:00:00', '2020-12-20', '2020-12-25', 'SS21'),
(2022, '0000-00-00 00:00:00', '2021-01-16', '2021-01-16', 'test2'),
(2023, '2021-01-16 20:02:34', '2021-01-16', '2021-01-16', 'test3'),
(2024, '2021-01-16 20:18:36', '2021-01-16', '2021-01-16', 'Testg'),
(2025, '2021-02-06 17:26:01', '0000-00-00', '0000-00-00', 'Test');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `creation_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(10) NOT NULL,
  `matriculation_nr` int(10) NOT NULL,
  `course_abbr` varchar(10) NOT NULL,
  `email` varchar(128) NOT NULL,
  `google_user_id` varchar(128) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `student`
--

INSERT INTO `student` (`id`, `creation_time`, `name`, `matriculation_nr`, `course_abbr`, `email`, `google_user_id`) VALUES
(1, '0000-00-00 00:00:00', 'Sebbi', 6565, 'WI', '', ''),
(43, '2021-01-16 20:20:13', 'Alex', 2342, 'WI', '', ''),
(150, '2021-01-16 20:20:13', 'Wilbert', 12345, 'OMM', '', '');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;

--
-- AUTO_INCREMENT für Tabelle `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4007;

--
-- AUTO_INCREMENT für Tabelle `project_type`
--
ALTER TABLE `project_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2026;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
