<?php

define('PROJECT_ROOT', dirname(__DIR__));
define('PUBLIC_ROOT', PROJECT_ROOT . '/public');

$config = readJsonFile(PROJECT_ROOT . '/config/constants.json');

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$filePath = realpath(PUBLIC_ROOT . $uri);

// $memcached = new Memcached();
// $memcached -> addServer('localhost', 11211);

if ($uri === '/' || $uri === '/index.html') {
    header('Content-Type: text/html');
    readfile(PUBLIC_ROOT . '/index.html');
    exit;
}

if (str_starts_with($uri, '/api')) {
    handleApi($uri);
    exit;
}

http_response_code(200);
include PUBLIC_ROOT . '/index.html';

function handleApi(string $uri)
{
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($uri) {
        case '/api/getServerTime':
            if ($method === 'GET') {
                getServerTime();
            } else {
                methodNotAllowed();
            }
            break;

        // case '/api/blog/':
        //     if ($method === 'GET') {
        //         getBlogPosts();
        //     } else {
        //         methodNotAllowed();
        //     }
        //     break;

        default:
            http_response_code(404);
            echo json_encode(["error" => "API endpoint not found"]);
    }
}

// function getBlogPosts()
// {
//     try {
//         global $memcached;

//         $cachedPosts = $memcached -> get('blogPosts');

//         if ($cachedPosts === false) {
//             $filePath = PROJECT_ROOT . '/blog_posts';
//             $posts = [];

//             foreach (scandir($filePath) as $file) {
//                 if (pathinfo($file, PATHINFO_EXTENSION) === 'json') {
//                     $content = file_get_contents($filePath . '/' . $file);
//                     $data = json_decode($content, true);

//                     $posts[] = [
//                         'title' => $data['title'],
//                         'url'   => pathinfo($file, PATHINFO_FILENAME)
//                     ];
//                 }
//             }

//             usort($posts, function ($a, $b) {
//                 return $b['content']['timeUpdated'] <=> $a['content']['timeUpdated'];
//             });

//             $success = $memcached -> set('blogPosts', $posts, 10000);
//             if (!$success) {
//                 error_log('Posts were not cached');
//             }
//         } else {
//             $posts = $cachedPosts;
//         }

//         header('Content-Type: application/json');
//         echo json_encode(['posts' => $posts]);
//     } catch (Exception $e) {
//         error_log('Error retrieving blog posts: ' . $e->getMessage());
//         http_response_code(500);
//         echo json_encode(['error' => 'Error retrieving blog posts']);
//     }
// }

function getServerTime()
{
    try {
        $openTimeStr = $config['corporateInfo']['openTime'] ?? '08:30';
        $closeTimeStr = $config['corporateInfo']['closeTime'] ?? '17:30';

        $timezone = new DateTimeZone('Europe/Warsaw');
        $openTime = DateTime::createFromFormat('H:i', $openTimeStr, $timezone);
        $closeTime = DateTime::createFromFormat('H:i', $closeTimeStr, $timezone);
        $currentTime = new DateTime('now', $timezone);

        $isOpen = ($currentTime >= $openTime && $currentTime <= $closeTime);

        echo json_encode([
            'isOpen' => $isOpen,
            'timeElapsed' => $currentTime -> getTimestamp() * 1000
        ]);
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode(['error' => 'Unknown issue']);
    }
}

function readJsonFile(string $filePath): array
{
    try {
        if (!file_exists($filePath)) {
            throw new Exception("File not found: $filePath");
        }

        $jsonData = file_get_contents($filePath);
        $data = json_decode($jsonData, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception("Invalid JSON in file: $filePath");
        }

        return $data;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e -> getMessage()]);
        exit;
    }
}

function methodNotAllowed()
{
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}