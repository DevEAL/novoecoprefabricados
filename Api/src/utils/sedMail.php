<?php
use PHPMailer\PHPMailer\PHPMailer;
use  PHPMailer\PHPMailer\SMTP ;
use PHPMailer\PHPMailer\Exception;

  class SendMail{
    static function EnviarCorreo($asunto, $body){

        $db = new Entity('nv_Parameters');
        $db->select('nv_value')
           ->where('nv_name = "Email_contacto" AND nv_status = 1');
        $sth = $db->execute();
        $email = $sth->fetch(PDO::FETCH_OBJ);
        $mail = new PHPMailer(true);
        try {
            //Server settings
            $mail->SMTPDebug = 0;                      // Enable verbose debug output
            $mail->isSMTP();                                            // Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = 'sendohlala@gmail.com';                     // SMTP username
            $mail->Password   = 'Enalgun1*';                               // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
            $mail->Port       = 587;                                    // TCP port to connect to
            //Recipients
            $mail->setFrom('sendohlala@gmail.com', 'Admin Portal');
            // $mail->addAddress('ohlalaemprende@gmail.com');     // Add a recipient
            $mail->addAddress($email->value);             // Name is optional
            // $mail->addAddress('desarrollo@enalgunlugarestudio.com');
            // // Attachments
            // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
            // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
            // Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = utf8_decode($asunto);
            $mail->Body    = $body;
            $mail->send();
            return true;
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            return false;
        }
    }
  }
?>