-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2021 at 09:10 PM
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
(9, 'demo', '123', 'Sale System', 'Test Business Name', 'Test', 'Test', 'test', 'test', '070509dc-logo2.png', 'Active', '2021-04-18 01:48:05', '2021-04-18 02:05:09');

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
