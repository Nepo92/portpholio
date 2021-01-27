<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\SMTP;
  use PHPMailer\PHPMailer\Exception;

  require 'vendor/autoload.php';
  // Получаем данные из html формы

  $name = $_POST['name'];
  $lastname = $_POST['lastname'];
  $email = $_POST['email'];
  $template = $_FILES['template']['name'];
  $description = $_POST['description'];

  if (isset($name) && isset($email)) {
    // Проверяем, загружен ли файл
    
    if (!empty($_FILES['template']['tmp_name'])) {
      // Загружаем файл в указанную папку на сервере

      move_uploaded_file($_FILES['template']['tmp_name'], "files/" . $_FILES['template']['name']);
    }
  }
  // Готовим к отправке

  $message = "
    Имя: $name<br>
    Фамилия: $lastname<br>
    E-mail: $email<br>
    Шаблон: http://f0497037.xsph.ru/files/$template<br>
    Описание: $description
  ";

  $messageAlt = "
    Имя: $name
    Фамилия: $lastname
    E-mail: $email
    Шаблон: http://f0497037.xsph.ru/files/$template
    Описание: $description
  ";

  $mail = new PHPMailer(true);

  try {
    //Server settings

    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host = 'ssl://smtp.mail.ru';
    $mail->SMTPAuth = true;
    $mail->Username = 'eremeev.a.e@mail.ru';
    $mail->Password = 'kinektikfield1';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';
    //Recipients

    $mail->setFrom('eremeev.a.e@mail.ru', 'Портфолио');
    $mail->addAddress('eremeev.a.e@mail.ru', 'Александр Еремеев');
    $mail->addReplyTo($email, 'Ответить');
    // Content

    $mail->isHTML(true);
    $mail->Subject = 'Новый заказ';
    $mail->Body    = $message;
    $mail->AltBody = $messageAlt;

    $mail->send();
  } catch (Exception $e) {
    echo "{$mail->ErrorInfo}";
  }
?>
