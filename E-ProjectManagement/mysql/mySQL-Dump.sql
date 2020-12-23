-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 21. Dez 2020 um 20:34
-- Server-Version: 10.4.13-MariaDB
-- PHP-Version: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
GRANT ALL PRIVILEGES ON *.* TO `root`@`127.0.0.1` with grant option;


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
(500, 'WI-Mathe', '235424');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `participation`
--

CREATE TABLE `participation` (
  `participation_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `student_matr_nr` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `participation`
--

INSERT INTO `participation` (`participation_id`, `project_id`, `student_matr_nr`) VALUES
(25, 90, 1001),
(26, 91, 1002);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `person`
--

CREATE TABLE `person` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `person`
--

INSERT INTO `person` (`id`, `name`, `role_id`) VALUES
(0, 'jens', 6),
(63, 'alex', 5),
(123, 'ghg', 2),
(143, 'ali', 7);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `semester_id` int(11) NOT NULL,
  `module_id` int(11) DEFAULT NULL,
  `short_description` varchar(45) DEFAULT NULL,
  `external_partner_list` varchar(45) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `bd_during_exam_period` int(11) DEFAULT NULL,
  `bd_before_lecture_period` int(11) DEFAULT NULL,
  `bd_during_leture_period` int(11) DEFAULT NULL,
  `preferred_bd_during_lecture_period` int(11) DEFAULT NULL,
  `language` varchar(45) DEFAULT NULL,
  `room` varchar(45) DEFAULT NULL,
  `special_room` tinyint(4) DEFAULT NULL,
  `flag` tinyint(4) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `projecttype_id` int(10) NOT NULL,
  `owner` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `project`
--

INSERT INTO `project` (`id`, `semester_id`, `module_id`, `short_description`, `external_partner_list`, `capacity`, `bd_during_exam_period`, `bd_before_lecture_period`, `bd_during_leture_period`, `preferred_bd_during_lecture_period`, `language`, `room`, `special_room`, `flag`, `name`, `status`, `projecttype_id`, `owner`) VALUES
(4000, 70, 5000, 'Hallo Welt', 'Forster, Kunz', 25, 2, 4, 6, 7, 'Deutsch', 'I002', NULL, NULL, 'Projekt1', 'new', 1, 0),
(4001, 71, 235424, 'fkldglerk', 'Klotz', 45, 2, 4, 1, 3, 'Englisch', 'I007', 0, 0, '', 'Projekt2', 2, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `projecttype`
--

CREATE TABLE `projecttype` (
  `id` int(11) NOT NULL,
  `sws` int(11) NOT NULL,
  `ects` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `projecttype`
--

INSERT INTO `projecttype` (`id`, `sws`, `ects`, `name`) VALUES
(1, 23, 12, 'Inter'),
(2, 46, 30, 'Wahl');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `passed` tinyint(4) DEFAULT NULL,
  `grade` double DEFAULT NULL,
  `evaluator` int(10) NOT NULL,
  `to_be_assessed` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `rating`
--

INSERT INTO `rating` (`id`, `passed`, `grade`, `evaluator`, `to_be_assessed`) VALUES
(1414, 1, 2, 123, 1);

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
(2, 'dozent'),
(5, 'dozent'),
(6, 'admin');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `semester`
--

CREATE TABLE `semester` (
  `id` int(11) NOT NULL,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `semester`
--

INSERT INTO `semester` (`id`, `start`, `end`, `name`) VALUES
(2020, '2020-12-01', '2020-12-18', 'WS20'),
(2021, '2020-12-20', '2020-12-25', 'SS21');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `student`
--

CREATE TABLE `student` (
  `matriculation_nr` int(10) NOT NULL,
  `course_abbr` varchar(10) NOT NULL,
  `person_id` int(10) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `student`
--

INSERT INTO `student` (`matriculation_nr`, `course_abbr`, `person_id`, `id`) VALUES
(6565, 'WI', 17, 1);

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
  ADD PRIMARY KEY (`participation_id`);

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
-- Indizes für die Tabelle `projecttype`
--
ALTER TABLE `projecttype`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT für Tabelle `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4002;

--
-- AUTO_INCREMENT für Tabelle `projecttype`
--
ALTER TABLE `projecttype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1416;

--
-- AUTO_INCREMENT für Tabelle `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT für Tabelle `semester`
--
ALTER TABLE `semester`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2022;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
