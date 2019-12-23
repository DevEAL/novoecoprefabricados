-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2019 a las 00:23:32
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `novo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nv_contact`
--

CREATE TABLE `nv_contact` (
  `idnv_contact` int(11) NOT NULL,
  `nv_name` varchar(45) DEFAULT NULL,
  `nv_email` varchar(45) DEFAULT NULL,
  `nv_phone` varchar(15) DEFAULT NULL,
  `nv_company` varchar(25) DEFAULT NULL,
  `nv_position` varchar(20) DEFAULT NULL,
  `nv_message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nv_cotizar`
--

CREATE TABLE `nv_cotizar` (
  `idnv_cotizar` int(11) NOT NULL,
  `nv_name` varchar(45) DEFAULT NULL,
  `nv_color` varchar(45) DEFAULT 'default',
  `nv_cantidad` varchar(10) DEFAULT NULL,
  `nv_idProducto` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nv_parameters`
--

CREATE TABLE `nv_parameters` (
  `idnv_Parameters` int(11) NOT NULL,
  `nv_name` varchar(45) DEFAULT NULL,
  `nv_status` int(11) DEFAULT NULL,
  `nv_value` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `nv_parameters`
--

INSERT INTO `nv_parameters` (`idnv_Parameters`, `nv_name`, `nv_status`, `nv_value`) VALUES
(1, 'Email_contacto', 1, 'backend@enalgunlugarestudio.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `nv_contact`
--
ALTER TABLE `nv_contact`
  ADD PRIMARY KEY (`idnv_contact`);

--
-- Indices de la tabla `nv_cotizar`
--
ALTER TABLE `nv_cotizar`
  ADD PRIMARY KEY (`idnv_cotizar`);

--
-- Indices de la tabla `nv_parameters`
--
ALTER TABLE `nv_parameters`
  ADD PRIMARY KEY (`idnv_Parameters`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `nv_contact`
--
ALTER TABLE `nv_contact`
  MODIFY `idnv_contact` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `nv_cotizar`
--
ALTER TABLE `nv_cotizar`
  MODIFY `idnv_cotizar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `nv_parameters`
--
ALTER TABLE `nv_parameters`
  MODIFY `idnv_Parameters` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
