-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 11. Dez 2020 um 14:57
-- Server-Version: 10.4.13-MariaDB
-- PHP-Version: 7.2.32

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

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4002;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
