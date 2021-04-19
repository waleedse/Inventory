-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2021 at 08:41 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sales`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` text DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `token`, `ip`, `created_at`, `updated_at`) VALUES
(1, 'sss', '123321', '$2y$10$L0aeX7TQCy/JIF9t6FA21uvUsQkLC.hLMTlRHKAsaNzXPzk.bVXvC', '127.0.0.1', '2021-04-03 04:30:51', '2021-04-18 00:31:32');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `user`, `created_at`, `updated_at`) VALUES
(16, '9th', 0, '2021-04-18 05:37:45', '2021-04-18 05:37:45'),
(17, '10th', 0, '2021-04-18 05:37:52', '2021-04-18 05:37:52'),
(18, '9th', 9, '2021-04-18 07:10:32', '2021-04-18 07:10:32'),
(19, '10th', 9, '2021-04-18 07:10:46', '2021-04-18 07:10:46');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `subtotal` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `grandtotal` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `subtotal`, `discount`, `grandtotal`, `date`, `user_id`, `created_at`, `updated_at`) VALUES
(5, 140, 20, 120, '2021-04-19', 9, '2021-04-19 09:42:25', '2021-04-19 09:42:25'),
(6, 140, 20, 120, '2021-04-19', 9, '2021-04-19 09:43:15', '2021-04-19 09:43:15'),
(7, 140, 20, 120, '2021-04-19', 9, '2021-04-19 09:43:46', '2021-04-19 09:43:46'),
(8, 140, 20, 120, '2021-04-19', 9, '2021-04-19 09:43:55', '2021-04-19 09:43:55'),
(9, 190, 30, 160, '2021-04-19', 9, '2021-04-19 09:45:56', '2021-04-19 09:45:56'),
(10, 190, 30, 160, '2021-04-19', 9, '2021-04-19 09:47:42', '2021-04-19 09:47:42'),
(11, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:04:55', '2021-04-19 10:04:55'),
(12, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:05:33', '2021-04-19 10:05:33'),
(13, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:06:02', '2021-04-19 10:06:02'),
(14, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:07:46', '2021-04-19 10:07:46'),
(15, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:11:29', '2021-04-19 10:11:29'),
(16, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:12:09', '2021-04-19 10:12:09'),
(17, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:13:54', '2021-04-19 10:13:54'),
(18, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:14:10', '2021-04-19 10:14:10'),
(19, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:14:29', '2021-04-19 10:14:29'),
(20, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:14:44', '2021-04-19 10:14:44'),
(21, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:15:47', '2021-04-19 10:15:47'),
(22, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:17:17', '2021-04-19 10:17:17'),
(23, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:18:07', '2021-04-19 10:18:07'),
(24, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:18:52', '2021-04-19 10:18:52'),
(25, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:19:40', '2021-04-19 10:19:40'),
(26, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:20:02', '2021-04-19 10:20:02'),
(27, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:20:17', '2021-04-19 10:20:17'),
(28, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:20:49', '2021-04-19 10:20:49'),
(29, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:21:16', '2021-04-19 10:21:16'),
(30, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:22:21', '2021-04-19 10:22:21'),
(31, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:22:41', '2021-04-19 10:22:41'),
(32, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:23:11', '2021-04-19 10:23:11'),
(33, 190, 30, 160, '2021-04-19', 9, '2021-04-19 10:23:26', '2021-04-19 10:23:26'),
(34, 0, 0, 0, '2021-04-19', 9, '2021-04-19 12:30:26', '2021-04-19 12:30:26'),
(35, 190, 0, 190, '2021-04-19', 9, '2021-04-19 12:31:17', '2021-04-19 12:31:17'),
(36, 190, 30, 160, '2021-04-19', 9, '2021-04-19 12:31:27', '2021-04-19 12:31:27'),
(37, 190, 30, 160, '2021-04-19', 9, '2021-04-19 12:32:07', '2021-04-19 12:32:07'),
(38, 190, 30, 160, '2021-04-19', 9, '2021-04-19 12:32:32', '2021-04-19 12:32:32'),
(39, 190, 30, 160, '2021-04-19', 9, '2021-04-19 12:32:59', '2021-04-19 12:32:59'),
(40, 190, 30, 160, '2021-04-19', 9, '2021-04-19 12:33:13', '2021-04-19 12:33:13'),
(41, 190, 30, 160, '2021-04-19', 9, '2021-04-19 12:33:23', '2021-04-19 12:33:23'),
(42, 190, 30, 160, '2021-04-19', 9, '2021-04-19 12:33:57', '2021-04-19 12:33:57'),
(43, 190, 30, 160, '2021-04-19', 9, '2021-04-19 12:34:26', '2021-04-19 12:34:26'),
(44, 0, 0, 0, '2021-04-19', 9, '2021-04-19 12:48:04', '2021-04-19 12:48:04'),
(45, 0, 0, 0, '2021-04-19', 9, '2021-04-19 12:48:21', '2021-04-19 12:48:21');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_products`
--

CREATE TABLE `invoice_products` (
  `id` int(11) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `retail_price` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoice_products`
--

INSERT INTO `invoice_products` (`id`, `invoice_id`, `product_id`, `retail_price`, `qty`, `created_at`, `updated_at`) VALUES
(3, 5, 71, 30, 2, '2021-04-19 09:42:25', '2021-04-19 09:42:25'),
(4, 5, 72, 80, 1, '2021-04-19 09:42:25', '2021-04-19 09:42:25'),
(5, 6, 71, 30, 2, '2021-04-19 09:43:15', '2021-04-19 09:43:15'),
(6, 6, 72, 80, 1, '2021-04-19 09:43:15', '2021-04-19 09:43:15'),
(7, 7, 71, 30, 2, '2021-04-19 09:43:46', '2021-04-19 09:43:46'),
(8, 7, 72, 80, 1, '2021-04-19 09:43:46', '2021-04-19 09:43:46'),
(9, 8, 71, 30, 2, '2021-04-19 09:43:55', '2021-04-19 09:43:55'),
(10, 8, 72, 80, 1, '2021-04-19 09:43:55', '2021-04-19 09:43:55'),
(11, 9, 71, 30, 1, '2021-04-19 09:45:56', '2021-04-19 09:45:56'),
(12, 9, 72, 80, 2, '2021-04-19 09:45:56', '2021-04-19 09:45:56'),
(13, 10, 71, 30, 1, '2021-04-19 09:47:42', '2021-04-19 09:47:42'),
(14, 10, 72, 80, 2, '2021-04-19 09:47:42', '2021-04-19 09:47:42'),
(15, 11, 71, 30, 1, '2021-04-19 10:04:55', '2021-04-19 10:04:55'),
(16, 11, 72, 80, 2, '2021-04-19 10:04:55', '2021-04-19 10:04:55'),
(17, 12, 71, 30, 1, '2021-04-19 10:05:33', '2021-04-19 10:05:33'),
(18, 12, 72, 80, 2, '2021-04-19 10:05:33', '2021-04-19 10:05:33'),
(19, 13, 71, 30, 1, '2021-04-19 10:06:02', '2021-04-19 10:06:02'),
(20, 13, 72, 80, 2, '2021-04-19 10:06:02', '2021-04-19 10:06:02'),
(21, 14, 71, 30, 1, '2021-04-19 10:07:46', '2021-04-19 10:07:46'),
(22, 14, 72, 80, 2, '2021-04-19 10:07:46', '2021-04-19 10:07:46'),
(23, 15, 71, 30, 1, '2021-04-19 10:11:29', '2021-04-19 10:11:29'),
(24, 15, 72, 80, 2, '2021-04-19 10:11:29', '2021-04-19 10:11:29'),
(25, 16, 71, 30, 1, '2021-04-19 10:12:09', '2021-04-19 10:12:09'),
(26, 16, 72, 80, 2, '2021-04-19 10:12:09', '2021-04-19 10:12:09'),
(27, 17, 71, 30, 1, '2021-04-19 10:13:54', '2021-04-19 10:13:54'),
(28, 17, 72, 80, 2, '2021-04-19 10:13:54', '2021-04-19 10:13:54'),
(29, 18, 71, 30, 1, '2021-04-19 10:14:10', '2021-04-19 10:14:10'),
(30, 18, 72, 80, 2, '2021-04-19 10:14:10', '2021-04-19 10:14:10'),
(31, 19, 71, 30, 1, '2021-04-19 10:14:29', '2021-04-19 10:14:29'),
(32, 19, 72, 80, 2, '2021-04-19 10:14:29', '2021-04-19 10:14:29'),
(33, 20, 71, 30, 1, '2021-04-19 10:14:44', '2021-04-19 10:14:44'),
(34, 20, 72, 80, 2, '2021-04-19 10:14:44', '2021-04-19 10:14:44'),
(35, 21, 71, 30, 1, '2021-04-19 10:15:47', '2021-04-19 10:15:47'),
(36, 21, 72, 80, 2, '2021-04-19 10:15:47', '2021-04-19 10:15:47'),
(37, 22, 71, 30, 1, '2021-04-19 10:17:17', '2021-04-19 10:17:17'),
(38, 22, 72, 80, 2, '2021-04-19 10:17:17', '2021-04-19 10:17:17'),
(39, 23, 71, 30, 1, '2021-04-19 10:18:07', '2021-04-19 10:18:07'),
(40, 23, 72, 80, 2, '2021-04-19 10:18:07', '2021-04-19 10:18:07'),
(41, 24, 71, 30, 1, '2021-04-19 10:18:52', '2021-04-19 10:18:52'),
(42, 24, 72, 80, 2, '2021-04-19 10:18:52', '2021-04-19 10:18:52'),
(43, 25, 71, 30, 1, '2021-04-19 10:19:40', '2021-04-19 10:19:40'),
(44, 25, 72, 80, 2, '2021-04-19 10:19:40', '2021-04-19 10:19:40'),
(45, 26, 71, 30, 1, '2021-04-19 10:20:02', '2021-04-19 10:20:02'),
(46, 26, 72, 80, 2, '2021-04-19 10:20:02', '2021-04-19 10:20:02'),
(47, 27, 71, 30, 1, '2021-04-19 10:20:17', '2021-04-19 10:20:17'),
(48, 27, 72, 80, 2, '2021-04-19 10:20:17', '2021-04-19 10:20:17'),
(49, 28, 71, 30, 1, '2021-04-19 10:20:49', '2021-04-19 10:20:49'),
(50, 28, 72, 80, 2, '2021-04-19 10:20:49', '2021-04-19 10:20:49'),
(51, 29, 71, 30, 1, '2021-04-19 10:21:16', '2021-04-19 10:21:16'),
(52, 29, 72, 80, 2, '2021-04-19 10:21:16', '2021-04-19 10:21:16'),
(53, 30, 71, 30, 1, '2021-04-19 10:22:21', '2021-04-19 10:22:21'),
(54, 30, 72, 80, 2, '2021-04-19 10:22:21', '2021-04-19 10:22:21'),
(55, 31, 71, 30, 1, '2021-04-19 10:22:41', '2021-04-19 10:22:41'),
(56, 31, 72, 80, 2, '2021-04-19 10:22:41', '2021-04-19 10:22:41'),
(57, 32, 71, 30, 1, '2021-04-19 10:23:11', '2021-04-19 10:23:11'),
(58, 32, 72, 80, 2, '2021-04-19 10:23:11', '2021-04-19 10:23:11'),
(59, 33, 71, 30, 1, '2021-04-19 10:23:26', '2021-04-19 10:23:26'),
(60, 33, 72, 80, 2, '2021-04-19 10:23:26', '2021-04-19 10:23:26'),
(61, 35, 71, 30, 1, '2021-04-19 12:31:17', '2021-04-19 12:31:17'),
(62, 35, 72, 80, 2, '2021-04-19 12:31:17', '2021-04-19 12:31:17'),
(63, 36, 71, 30, 1, '2021-04-19 12:31:27', '2021-04-19 12:31:27'),
(64, 36, 72, 80, 2, '2021-04-19 12:31:27', '2021-04-19 12:31:27'),
(65, 37, 71, 30, 1, '2021-04-19 12:32:07', '2021-04-19 12:32:07'),
(66, 37, 72, 80, 2, '2021-04-19 12:32:07', '2021-04-19 12:32:07'),
(67, 38, 71, 30, 1, '2021-04-19 12:32:32', '2021-04-19 12:32:32'),
(68, 38, 72, 80, 2, '2021-04-19 12:32:32', '2021-04-19 12:32:32'),
(69, 39, 71, 30, 1, '2021-04-19 12:32:59', '2021-04-19 12:32:59'),
(70, 39, 72, 80, 2, '2021-04-19 12:32:59', '2021-04-19 12:32:59'),
(71, 40, 71, 30, 1, '2021-04-19 12:33:13', '2021-04-19 12:33:13'),
(72, 40, 72, 80, 2, '2021-04-19 12:33:13', '2021-04-19 12:33:13'),
(73, 41, 71, 30, 1, '2021-04-19 12:33:23', '2021-04-19 12:33:23'),
(74, 41, 72, 80, 2, '2021-04-19 12:33:23', '2021-04-19 12:33:23'),
(75, 42, 71, 30, 1, '2021-04-19 12:33:57', '2021-04-19 12:33:57'),
(76, 42, 72, 80, 2, '2021-04-19 12:33:57', '2021-04-19 12:33:57'),
(77, 43, 71, 30, 1, '2021-04-19 12:34:26', '2021-04-19 12:34:26'),
(78, 43, 72, 80, 2, '2021-04-19 12:34:26', '2021-04-19 12:34:26');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `enabled` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `purchase_price` int(11) NOT NULL,
  `retail_price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL DEFAULT 0,
  `user` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `code`, `qty_type`, `enabled`, `purchase_price`, `retail_price`, `stock`, `category_id`, `qty`, `user`, `created_at`, `updated_at`) VALUES
(71, 'tests', '2', 'Piece', '1', 20, 30, 20, 18, 0, 9, '2021-04-18 06:43:55', '2021-04-18 07:16:52'),
(72, 'Urdu Grammer Book', '03', 'Piece', '1', 20, 80, 20, 18, 0, 9, '2021-04-18 12:52:54', '2021-04-18 12:52:54');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brandname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shortname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fulladdress` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shortaddress` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `brandname`, `fullname`, `shortname`, `fulladdress`, `shortaddress`, `phone`, `logo`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin', '123', 'Campus Portals', 'Unique Science Academy', 'NK Concept School & Academy of Sciences', 'Oppo. gajjumata Metro Bus Stop.', 'Oppo. gajjumata Metro Bus Stop.', '0312345678', 'logo.png', 'Active', '2020-06-27 14:25:04', '2021-04-18 01:47:37'),
(4, 'alsyed', '123', 'Campus Portal', 'Alsyed Science Academy', 'King Public School', 'Nishter colony lhr', 'Nishter colony lhr', '03174011206', '1594061725.png', 'Active', '2020-07-05 12:42:03', '2020-09-19 01:41:25'),
(9, 'demo', '123', 'Sale System', 'Test Business Name', 'Dar-e-Arqam Book Shop', 'Glaxo town lahore pakistan', 'Glaxo town lahore pakistan', '03174011206', '151123daraarqam logo.JPG', 'Active', '2021-04-18 01:48:05', '2021-04-19 10:12:07');

-- --------------------------------------------------------

--
-- Table structure for table `users_meta`
--

CREATE TABLE `users_meta` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_ip` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token_validation` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users_meta`
--

INSERT INTO `users_meta` (`id`, `user_id`, `token`, `user_ip`, `token_validation`, `created_at`, `updated_at`) VALUES
(5, '1', '$2y$10$DjCYoj3gCLzsCAiKdgTDPurESEK/EScqntZERuxdGMjc8xt6i3MZC', '127.0.0.1', '22-08-2020 12:08:47pm', '2020-08-22 07:49:47', '2020-08-22 07:49:47'),
(6, '4', '$2y$10$FFcrnqmvuNKvopjnGO8mTeaFM9S8GqwcG0.Jrr.bGkfwY4GErNqyO', '127.0.0.1', '30-08-2020 09:08:42am', '2020-08-30 04:00:42', '2020-08-30 04:00:42'),
(7, '2', '$2y$10$ozfeEO7TzVPxjaFBTJgYWOhUjSFLzqkvWZXd6Fl7RXFtu8hhZp6DC', '127.0.0.1', '01-10-2020 13:10:36pm', '2020-10-01 08:12:36', '2020-10-01 08:12:36'),
(8, '1', '$2y$10$6aslPjNH7TheZJxOH8eOvejRzi3ra/7UEpifsTR7vUg.XnHm0Vgmi', '192.168.10.16', '05-10-2020 17:10:54pm', '2020-10-05 12:40:54', '2020-10-05 12:40:54'),
(9, '1', '$2y$10$Ee3um9XjYUIfOn/BjbfUFOQi4o2VZyT7YBiVhCgEMD3RSG85/Vb.u', '192.168.10.17', '06-10-2020 16:10:11pm', '2020-10-06 11:18:11', '2020-10-06 11:18:11'),
(10, '1', '$2y$10$ShNVk9BpbazBGEHdq.A02uJ.luVM.LUhOrNNM.Lgtwf3J.QW8D4YW', '192.168.10.26', '20-10-2020 17:10:44pm', '2020-10-20 12:48:44', '2020-10-20 12:48:44'),
(11, '1', '$2y$10$sZ.i53r.ey7Likix.MSNUeSXJ9XBmxZ3ZKSw0zlpxAzI0t90MWtqq', '192.168.10.7', '05-12-2020 18:12:22pm', '2020-12-05 13:31:22', '2020-12-05 13:31:22'),
(12, '1', '$2y$10$gSUBd7l6cKerLZQGJDQqQ.fv0OT3pO/4iaGyMVjHTZO4xBglMIulK', '192.168.10.8', '13-12-2020 15:12:36pm', '2020-12-13 10:06:36', '2020-12-13 10:06:36'),
(13, '2', '$2y$10$iEwIk0RCV8UoDw.7EmILke9XeDJ863vEhroqk7MxWDiJ.2bkrHiOW', '192.168.10.20', '23-03-2021 07:03:43am', '2021-03-23 02:26:43', '2021-03-23 02:26:43'),
(14, '1', '$2y$10$BQdSqAQPFTr7b4OOAE2ev.a7aanLf2GCTa4qhuCuDaDg9E2Tfu57W', '192.168.10.11', '02-04-2021 18:04:09pm', '2021-04-02 13:58:10', '2021-04-02 13:58:10'),
(15, '1', '$2y$10$Cs.1dxa81lrqHiM/MsA5Y.O7im0J5dKO3Y4pIk0aB2OUQrtpRutvW', '192.168.10.12', '05-04-2021 06:04:30am', '2021-04-05 01:09:30', '2021-04-05 01:09:30'),
(16, '1', '$2y$10$n/OFjG0Fyt.VzCDBYcZ0t.ZcVjsEKHqHLqrPbIM8jIuvzZx5pjBFC', '192.168.10.36', '06-04-2021 07:04:49am', '2021-04-06 02:02:49', '2021-04-06 02:02:49'),
(17, '9', '$2y$10$ol.nL9Wlvv1fMGeuDAQlEOGDIOzx3D9qrz.8H9EWNkVU3Lz02dcXS', '127.0.0.1', '18-04-2021 09:04:07am', '2021-04-18 04:06:07', '2021-04-18 04:06:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice_products`
--
ALTER TABLE `invoice_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_meta`
--
ALTER TABLE `users_meta`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `invoice_products`
--
ALTER TABLE `invoice_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users_meta`
--
ALTER TABLE `users_meta`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
