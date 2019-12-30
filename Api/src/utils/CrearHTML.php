<?php

class CrearHTML {
    public static function Html($body, $titulo, $option) {
        $HTMLStart =
            '
            <html>
              <head>
                <meta charset=utf-8"/>
                <style>
                table {
                  width:60%;
                }
                table, th, td {
                  border: 1px solid #c0c0c0;
                  border-collapse: collapse;
                }
                th, td {
                  padding: 15px;
                  text-align: left;
                }
                table#t01 tr:nth-child(even) {
                  background-color: #eee;
                }
                table#t01 tr:nth-child(odd) {
                 background-color: #fff;
                }
                table#t01 th {
                  background-color: #8fb52b;
                  color: white;
                }
                </style>
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

          $tabla='';
          foreach ($body as $key => $value) {

            $tabla1 = '
              <tr>
                <td>'.$body[$key]['name'].'</td>
                <td>'.$body[$key]['color'].'</td>
                <td>'.$body[$key]['cantidad'].'</td>
              </tr>
            ';
            $tabla .= $tabla1;
          }
          $HTMLSection =
            '
            <div>
              <table id="t01">
                <tr>
                  <th>Nombre</th>
                  <th>Color</th>
                  <th>Cantidad</th>
                </tr>
                '.$tabla.'
              </table>
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