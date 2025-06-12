<?php

namespace App\Utils;

use Predis\Client;
use Dotenv\Dotenv;

class RedisClient
{
    private static ?Client $client = null;

    public static function get(): Client
    {
        $dotenv = Dotenv::createImmutable(__DIR__, '/../../.env');
        $dotenv->safeLoad();

        if (!self::$client) {
            self::$client = new Client([
                'scheme' => 'tls',
                'host' => $_ENV['REDIS_HOST'],
                'port' => $_ENV['REDIS_PORT'],
                'password' => $_ENV['REDIS_PASSWORD'],
            ]);
        }

        return self::$client;
    }
}