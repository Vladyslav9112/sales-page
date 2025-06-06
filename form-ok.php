<?php
session_start();

// Формуємо масив із товарами в замовленні
$products_list = array(
    array(
        'product_id' => '5',    // Код товару (з каталогу CRM)
        'price'      => $_REQUEST['product_price'], // Ціна товару
        'count'      => '1',                        // Кількість товару
    )
);

// Генеруємо унікальний ідентифікатор замовлення
$order_id = number_format(round(microtime(true) * 10), 0, '.', '') . rand(10000, 99999);

// Серіалізуємо масив продуктів
$products = urlencode(serialize($products_list));

// Серіалізуємо дані про відправника
$sender = urlencode(serialize($_SERVER));

// Параметри запиту
$data = array(
    'key'        => '5ca202c3f5943af40b2f5533cbe96e20', // Вхідний ключ API CRM
    'order_id'   => $order_id,                          // Ідентифікатор замовлення
    'country'    => 'UA',                               // Країна
    'products'   => $products,                          // Серіалізований масив із товарами
    'bayer_name' => $_REQUEST['name'],                  // Покупець (П.І.Б.)
    'phone'      => $_REQUEST['phone'],                 // Телефон
    'sender'     => $sender                             // Інформація про запит
);

// Виконуємо запит через cURL
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'http://nicestag.lp-crm.biz/api/addNewOrder.html');
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data)); // Форматуємо дані в запит
$response = curl_exec($curl);
$response_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

// Перевірка результату
$response_data = json_decode($response, true);

if ($response_code === 200 && isset($response_data['status']) && $response_data['status'] === 'ok') {
    // Успішна відправка
    ?>
    <!DOCTYPE html>
    <html lang="uk">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Дякуємо, заявку прийнято</title>
        <link rel="stylesheet" href="/css/style.css/style-order.css" />
      </head>
      <body>
        <main>
          <div class="thank-you">
            <h1 class="thank-you__title">Дякуємо, заявку прийнято!</h1>
            <p>
              Наш оператор зв'яжеться з вами найближчим часом.
              <br />
              Будь ласка, очікуйте дзвінка!
            </p>
            <p class="thank-you__notice">
              Якщо ви припустилися помилки, поверніться на сторінку замовлення та надішліть форму ще раз.
            </p>
            <a href="https://3v1prime.nasoloda.store/" class="thank-you__button">Повернутися на сайт</a>
          </div>
        </main>
      </body>
    </html>
    <?php
} else {
    // Невдала відправка
    $error_message = isset($response_data['message']) ? implode(', ', $response_data['message']) : 'Невідома помилка';
    ?>
    <!DOCTYPE html>
    <html lang="uk">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Помилка</title>
        <link rel="stylesheet" href="/css/style.css/style-order.css" />
      </head>
      <body>
        <main>
          <div class="error">
            <h1 class="error__title">Помилка</h1>
            <p>
              Відправити заявку не вдалося. Можливі причини:
              <ul>
                <li>Сервер CRM тимчасово недоступний.</li>
                <li>Дані заповнено некоректно.</li>
                <li>Перевірте інтернет-з'єднання.</li>
              </ul>
            </p>
            <p class="error__notice">
              Спробуйте повторити пізніше.
              <br />
              HTTP Код відповіді: <?= htmlspecialchars($response_code) ?>.
              <br />
              Відповідь сервера: <?= htmlspecialchars($error_message) ?>.
            </p>
            <a href="index.php" class="error__button">Повернутися на сайт</a>
          </div>
        </main>
      </body>
    </html>
    <?php
}
?>
