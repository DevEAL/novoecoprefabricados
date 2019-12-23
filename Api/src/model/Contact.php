<?php

class ModelContact {

    public function SelectAll() {
        $db = new Entity('nv_contact');
        try {
            $db->select('*');
            $sth = $db->execute();

            $response = $sth->fetchAll(PDO::FETCH_ASSOC);

            return $response;
        } catch (PDOExcenvion $e) {
            echo $e->getMessage();
            return false;
        }
    }

    public function Insert($request) {

        $body = $request->getParsedBody();

        $db = new Entity('nv_contact');
         try {
            
            $arrayBody = array(
                'nv_name' => "'{$body['name']}'",
                'nv_email' => "'{$body['email']}'",
                'nv_phone' => "'{$body['phone']}'",
                'nv_company' => "'{$body['company']}'",
                'nv_position' => "'{$body['phone']}'",
                'nv_message' => "'{$body['message']}'"
            );

            $db->Insert($arrayBody);
            $id = $db->execute_id();

            $asunto = 'Contacto' . $id;

            $template = CrearHTML::Html($body, $asunto, 'contact');

            if (empty($template)) {
                return array( 'template' => 'Template error' );
            } else {
                if (SendMail::EnviarCorreo($asunto, $template)) {
                    return true;
                } else {
                    return array( 'email' => 'Template de envio de correo' );
                }
            }
         } catch (PDOExcenvion $e){
            echo $e->getMessage();
            return false;
         }
    }
}