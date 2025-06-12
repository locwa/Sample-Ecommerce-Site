<?php

namespace App\Utils;

use Predis\Client;
use Dotenv\Dotenv;

class RedisClient
{
    private static ?Client $client = null;

    public static function get(): Client
    {
        // Only load .env locally (not on Vercel or in production)
        if (file_exists(__DIR__ . '/../../.env')) {
            $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
            $dotenv->safeLoad();
        }

        if (!self::$client) {
            // Read from $_ENV or $_SERVER
            $host = $_ENV['REDIS_HOST'] ?? $_SERVER['REDIS_HOST'] ?? null;
            $port = $_ENV['REDIS_PORT'] ?? $_SERVER['REDIS_PORT'] ?? 6379;
            $password = $_ENV['REDIS_PASSWORD'] ?? $_SERVER['REDIS_PASSWORD'] ?? null;

            if (!$host || !$password) {
                throw new \RuntimeException('Missing Redis credentials.');
            }

            self::$client = new Client([
                'scheme'   => 'tls',
                'host'     => $host,
                'port'     => $port,
                'password' => $password,
            ]);
        }

        return self::$client;
    }
}