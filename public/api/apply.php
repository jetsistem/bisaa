<?php
/**
 * Bissa Akademi — cPanel İletişim & Tanışma Dersi E-Posta / Kayıt Uç Noktası
 * Subdomain kök dizininde (/api/apply.php) otomatik çalışır.
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Yalnızca POST istekleri kabul edilir.']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Geçersiz veri formatı.']);
    exit;
}

// Bildirimlerin düşeceği e-posta adresini buradan güncelleyebilirsiniz:
$toEmail = 'info@' . preg_replace('/^www\./i', '', $_SERVER['HTTP_HOST'] ?? 'bissaakademi.com');

$type       = trim((string)($data['type'] ?? 'Tanışma Dersi & Ön Kayıt'));
$name       = trim((string)($data['name'] ?? ''));
$phone      = trim((string)($data['phone'] ?? ''));
$email      = trim((string)($data['email'] ?? '-'));
$campus     = trim((string)($data['campus'] ?? 'Güneşli Sınav Koleji Kampüsü'));
$discipline = trim((string)($data['discipline'] ?? '-'));
$ageOrYear  = trim((string)($data['ageOrYear'] ?? '-'));
$date       = date('d.m.Y H:i:s');

if (mb_strlen($name) < 2 || mb_strlen(preg_replace('/\D/', '', $phone)) < 10) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Ad soyad ve geçerli telefon numarası zorunludur.']);
    exit;
}

$subject = '=?UTF-8?B?' . base64_encode("Bissa Akademi Yeni Başvuru: {$name} ({$type})") . '?=';

$body = "Bissa Akademi Web Sitesi üzerinden yeni bir başvuru alındı:\n\n"
      . "Başvuru Türü : {$type}\n"
      . "Ad Soyad     : {$name}\n"
      . "Telefon      : {$phone}\n"
      . "E-Posta      : {$email}\n"
      . "Yerleşke     : {$campus}\n"
      . "Branş / Etkinlik: {$discipline}\n"
      . "Yaş / Doğum Yılı: {$ageOrYear}\n"
      . "Tarih        : {$date}\n";

$headers = "From: Bissa Akademi Web <noreply@" . ($_SERVER['HTTP_HOST'] ?? 'localhost') . ">\r\n"
         . "Reply-To: " . ($email !== '-' && filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : $toEmail) . "\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n";

@mail($toEmail, $subject, $body, $headers);

// Yedek olarak sunucuda güvenli log dosyasına da kaydeder (silinmez veri güvencesi)
$logDir = __DIR__ . '/private_leads';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0755, true);
    @file_put_contents($logDir . '/.htaccess', "Require all denied\nDeny from all\n");
}
$logLine = sprintf("[%s] %s | %s | %s | %s | %s | %s | %s\n", $date, $type, $name, $phone, $email, $campus, $discipline, $ageOrYear);
@file_put_contents($logDir . '/basvurular.log', $logLine, FILE_APPEND | LOCK_EX);

echo json_encode(['ok' => true, 'message' => 'Başvurunuz başarıyla kaydedildi.']);
