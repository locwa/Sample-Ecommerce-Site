<?php

namespace App\Utils;

use Predis\Client;
use Dotenv\Dotenv;

class RedisClient
{
    private static ?Client $client = null;

    public static function get(): Client
    {
        $dotenv = Dotenv::createImmutable(dirname(__DIR__, 2));
        $dotenv->safeLoad();

        if (!self::$client) {
            self::$client = new Client([
                'scheme' => 'tls',
                'host' => $_ENV['REDIS_HOST'],
                'port' => 6739,
                'password' => $_ENV['REDIS_PASSWORD'],
            ]);
        }

        return self::$client;
    }
}