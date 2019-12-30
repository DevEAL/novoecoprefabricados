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
        $productos = json_encode($body['productos']);
        print_r($body['productos']);
        $db = new Entity('nv_registro');
         try {
            $arrayRegistro = array(
                'nv_CantidadProductos' => count($body)
            );

            $db->Insert($arrayRegistro);
            $id = $db->execute_id();

            foreach ($productos as $key => $value) {
                $arrayBody = array(
                    'nv_name' => "'{$body[$key]['name']}'",
                    'nv_color' => "'{$body[$key]['color']}'",
                    'nv_cantidad' => "'{$body[$key]['cantidad']}'",
                    'nv_idProducto' => "'{$body[$key]['idProducto']}'",
                    'nv_idRegistro' => "'{$id}'",
                );
                $db->table_name('nv_cotizar');
                $db->Insert($arrayBody);
                $db->execute();
            }

            $asunto = 'Formulario Promoción' . $id;

            $template = CrearHTML::Html($body, $asunto, 'cotizar');
            
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