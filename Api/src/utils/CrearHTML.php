<?php

class CrearHTML {
    public static function Html($body, $titulo, $option) {
        $HTMLStart =
            '
            <html>
              <head>
                <meta charset=utf-8"/>
              </head>
              <body>
            ';
        $HTMLBody =
            '
            <div>
              <h2>'.$titulo.'</h2>
            </div>
            ';
        if ($option == 'cotizar') {
          $HTMLSection =
            '
            <div>
              <p>Nombre del Producto: <span>'.$body['nv_name'].'</span></p>
              <p>Color: <span>'.$body['nv_color'].'</span></p>
              <p>Cantidad: <span>'.$body['nv_cantidad'].'</span></p>
              <p>id Producto: <span>'.$body['nv_idProducto'].'</span></p>
            </div>
            ';
        } else {
          $HTMLSection =
            '
            <div>
              <p>Nombre: <span>'.$body['name'].'</span></p>
              <p>Correo: <span>'.$body['email'].'</span></p>
              <p>Celular: <span>'.$body['phone'].'</span></p>
              <p>Empresa: <span>'.$body['company'].'</span></p>
              <p>Cargo: <span>'.$body['position'].'</span></p>
              <p>Mensaje: <span>'.$body['message'].'</span></p>
            </div>
            ';
        }
        $HTMLFinish =
            '
              </body>
            </html>
            ';
        $HTML = $HTMLStart . $HTMLBody . $HTMLSection . $HTMLFinish;

        return $HTML;
    }
}