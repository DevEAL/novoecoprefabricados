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
                .titulo{
                  text-align: center !important;
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

          $productos = $body['productos'];
          
          $tabla='';
          foreach ($productos as $key => $value) {

            $tabla1 = '
              <tr>
                <td>'.$productos[$key]['name'].'</td>
                <td>'.$productos[$key]['color'].'</td>
                <td>'.$productos[$key]['cantidad'].'</td>
              </tr>
            ';
            $tabla .= $tabla1;
          }
          $HTMLSection =
            '
            <div>
              <table id="t01">
                <tr>
                  <th class="titulo" colspan="3">Datos Principales</th>
                </tr>
                <tr>
                  <td>Nombre</td>
                  <td colspan="2">'.$body['name'].'</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td colspan="2">'.$body['email'].'</td>
                </tr>
                <tr>
                  <td>Telefono</td>
                  <td colspan="2">'.$body['phone'].'</td>
                </tr>
                <tr>
                  <th class="titulo" colspan="3">Productos Cotizados</th>
                </tr>
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