<?php

class ModelCotizar {

    public function SelectAll() {
        $db = new Entity('nv_cotizar');
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

        $db = new Entity('nv_cotizar');
         try {
            $arrayBody = array(
                'nv_name' => "'{$body['name']}'",
                'nv_color' => "'{$body['color']}'",
                'nv_cantidad' => "'{$body['cantidad']}'",
                'nv_idProducto' => "'{$body['idProducto']}'",
            );

            $db->Insert($arrayBody);
            $id = $db->execute_id();

            $asunto = 'Formulario Promoción' . $id;

            $template = CrearHTML::Html($arrayBody, $asunto, 'cotizar');
            print_r($template);
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