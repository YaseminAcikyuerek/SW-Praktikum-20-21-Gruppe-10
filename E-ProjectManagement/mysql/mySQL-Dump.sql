-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 06. Jan 2021 um 17:16
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

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `module`
--

CREATE TABLE `module` (
  `id` int(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `edv_nr` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `module`
--

INSERT INTO `module` (`id`, `name`, `edv_nr`) VALUES
(300, 'IT-Projekt', '5000'),
(500, 'WI-Mathe', '235424'),
(501, 'ssf', 'ekv');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `participation`
--

CREATE TABLE `participation` (
  `id` int(11) NOT NULL,
  `project` int(11) NOT NULL,
  `student` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `participation`
--

INSERT INTO `participation` (`id`, `project`, `student`) VALUES
(27, 4000, 3),
(28, 0, 1),
(29, 4, 1),
(30, 0, 1),
(31, 14, 12),
(32, 0, 1000),
(33, 90, 1000),
(34, 90, 1000),
(35, 90, 1000),
(5000, 91, 1002),
(5001, 2, 3),
(5002, 4000, 1),
(5003, 2, 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `person`
--

CREATE TABLE `person` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `person`
--

INSERT INTO `person` (`id`, `name`, `role`) VALUES
(0, '63', 0),
(63, 'hansg', 1),
(123, 'ghg', 2),
(143, 'ali', 3),
(144, 'Yasemin', 2),
(145, 'dozent', 1),
(146, 'ss', 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `module` int(11) NOT NULL,
  `short_description` mediumtext NOT NULL,
  `external_partner_list` varchar(45) NOT NULL,
  `capacity` int(11) NOT NULL,
  `bd_during_exam_period` int(11) NOT NULL,
  `bd_before_lecture_period` int(11) NOT NULL,
  `bd_during_leture_period` int(11) NOT NULL,
  `preferred_bd_during_lecture_period` int(11) NOT NULL,
  `language` varchar(45) NOT NULL,
  `room` varchar(45) NOT NULL,
  `special_room` tinyint(1) NOT NULL,
  `flag` tinyint(1) NOT NULL,
  `name` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `project_type` int(10) NOT NULL,
  `owner` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `project`
--

INSERT INTO `project` (`id`, `semester`, `module`, `short_description`, `external_partner_list`, `capacity`, `bd_during_exam_period`, `bd_before_lecture_period`, `bd_during_leture_period`, `preferred_bd_during_lecture_period`, `language`, `room`, `special_room`, `flag`, `name`, `status`, `project_type`, `owner`) VALUES
(4000, 70, 300, 'hjhjfjfgjkfkl', 'Forster', 25, 2, 4, 6, 7, 'Deutsch', 'I002', 0, 0, 'Projekt1', 'new', 1, 63),
(4001, 71, 500, 'fkldglerk', 'Klotz', 45, 2, 4, 1, 3, 'Englisch', 'I007', 0, 0, '', 'Projekt2', 2, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `project_type`
--

CREATE TABLE `project_type` (
  `id` int(11) NOT NULL,
  `sws` int(11) NOT NULL,
  `ects` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `project_type`
--

INSERT INTO `project_type` (`id`, `sws`, `ects`, `name`) VALUES
(2, 46, 30, 'Wahl');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `passed` tinyint(5) DEFAULT NULL,
  `grade` float DEFAULT NULL,
  `evaluator` int(10) NOT NULL,
  `to_be_assessed` int(10) NOT NULL,
  `project` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `rating`
--

INSERT INTO `rating` (`id`, `passed`, `grade`, `evaluator`, `to_be_assessed`, `project`) VALUES
(1414, 1, 6, 7, 8, 3),
(1415, 0, 1, 3, 4, 2),
(1416, 1, 1, 3, 4, 2),
(1417, 0, 1, 3, 4, 2),
(1418, 1, 1, 3, 4, 2),
(1419, 1, 1, 3, 4, 2),
(1420, 2, 1, 3, 3, 2),
(1421, 0, 1, 3, 4, 2),
(1422, 0, 1, 3, 4, 2),
(1423, 1, 1, 3, 4, 2),
(1424, 1, 1, 3, 4, 2),
(1425, 2, 1, 3, 4, 2),
(1426, 2, 1, 3, 4, 2),
(1427, 1, 1, 3, 4, 2),
(1428, 1, 1, 3, 4, 2),
(1429, 0, 1, 3, 4, 2),
(1430, 2, 1, 8, 8, 4000),
(1431, 2, 1, 8, 8, 4000),
(1432, 0, 1, 3, 4, 2),
(1433, 4, 1, 2, 4, 1),
(1434, 4, 1, 2, 4, 1),
(1435, 4, 1, 2, 4, 1),
(1436, 7, 0, 2, 4, 1),
(1437, 7, 0, 2, 4, 1),
(1438, 5, 1, 3, 4, 2),
(1439, 1, 2, 3, 4, 2),
(1440, 1, 2, 5, 6, 4),
(1441, 1, 3, 2, 1, 5),
(1442, 0, 1, 3, 4, 2),
(1443, 1, 2, 2, 1, 1),
(1444, 1, 2, 3, 4, 2),
(1445, 1, 4, 7, 7, 5),
(1446, 1, 4, 7, 9, 5),
(1447, 1, 2.3, 0, 7, 5);

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
(3, 'admin');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `semester`
--

CREATE TABLE `semester` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `semester`
--

INSERT INTO `semester` (`id`, `name`, `start`, `end`) VALUES
(2020, 'WS20', '0000-00-00', '0000-00-00'),
(2021, 'SS21', '0000-00-00', '0000-00-00'),
(2022, 'WI', '0000-00-00', '0000-00-00'),
(2023, 'it', '2021-01-08', '2021-01-09'),
(2024, 'hft', '2021-01-04', '2021-01-05'),
(2025, 'sss', '2021-01-05', '2021-01-06');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `matriculation_nr` varchar(10) NOT NULL,
  `course_abbr` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `student`
--

INSERT INTO `student` (`id`, `name`, `matriculation_nr`, `course_abbr`) VALUES
(1, 'strifafng', 'strafawfin', 'striafawfn'),
(2, '3', 'sts', 'awfw'),
(3, '2', 'sfg', 'sayo'),
(4, '2', 'sfg', 'sayo'),
(5, '4', 'awffaaw', 'asfwaawf'),
(6, '1', 'bwl', 'hdm'),
(7, '6', 'hft', 'wit'),
(8, '1', 'sz', 'fs'),
(9, '3', 'sssss', 'ssss'),
(10, '0', 'sz', 'abbr'),
(11, '0', 'strs', 'ffs'),
(12, 'sslafgwg', 'ssf', 'strid');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT für Tabelle `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4002;

--
-- AUTO_INCREMENT für Tabelle `project_type`
--
ALTER TABLE `project_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1448;

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
