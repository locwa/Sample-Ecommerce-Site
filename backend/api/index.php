<?php

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__, '/../.env');
$dotenv->safeLoad();

header('Access-Control-Allow-Origin: '. $_ENV['FRONTEND_APP_URL']);
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

// Forward vercel requests to index.php in public directory
require __DIR__ . '/../public/index.php';