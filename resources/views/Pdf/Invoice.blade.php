<html>

<head>
    <!--
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" media="all">-->
    <style type="text/css">
        #mytable {
            width: 100%;
            border-collapse: collapse;


        }

        #mytable,
        #mth,
        #mtd {
            border: 1px solid black;
        }

        #mth {
            padding-left: 1px;
            font-weight: bold;
            font-size: 14px;

        }

        #mtd {
            padding-left: 10px;
            font-size: 14px;
            text-align:center;
        }

        div {
            font-family: sans-serif;
        }

        #rowtable {
            width: 100%;
            font-size: 14px;
            font-style: bold;
            margin-left: 0px;
            margin-top: 60px;
        }

        #rowtable2 {
            width: 100%;
            margin-left: 0px;
            margin-top: -60px;
        }

        .topheads {
            font-size: 12px
        }
        img{
	position:absolute;
	top:0;
	left:10px;
	width:50px;
	height:50px;
	margin-top:-30px;
}
    </style>

</head>

<body>
    <div>


        <br />
        <?php
        $logourl = 'images/' . $user->logo;
        ?>

        <div >
            <table id="rowtable2">
            <img  src="{{$logourl}}"/>
                <tr style="margin-top:10px">
                    <td style="font-family:Arial, Helvetica, sans-serif
                        ;text-align:center;font-style:bold;font-size:24px">
                            {{$user->shortname}}
                    </td>
                </tr>
                <tr height="10" style="margin-top:-17px">
                    <td style="text-align:center;font-size:11px">
                        {{$user->shortaddress}}
                    </td>
                </tr>
                <tr height="10" style="margin-top:-17px">
                    <td style="text-align:center;font-size:11px">
                        {{$user->phone}}
                    </td>
                </tr>
            </table>



        </div>
        <table id="rowtable">

            <tr class="topheads" style="text-align:left">
                <td>Invoice Id: {{$invoice->id}}</td>
            </tr>
            <tr class="topheads">
                <td style="text-align:left">To: </td>
                <td style="text-align:right">Date: {{$invoice->date}}</td>
            </tr>


        </table>
        <table id="mytable">


            <tr>
                <th id="mth">Sr.</th>
                <th id="mth">Product</th>
                <th id="mth">Price</th>
                <th id="mth">Qty</th>
                <th id="mth">Total</th>
            </tr>
            @foreach($invoice_products as $key => $item)
            <tr>
                <td id="mtd">{{ $key+1 }}</td>
                <td id="mtd">{{ $item['name'] }}</td>
                <td id="mtd">{{ $item['retail_price'] }}</td>
                <td id="mtd">{{ $item['qty'] }}</td>
                <td id="mtd">{{ $item['retail_price'] * $item['qty'] }}</td>
            </tr>
            @endforeach



        </table>
        <table id="mytable" style="width:50%;margin-left:auto ; margin-right:-5px;margin-top:20px">

            <tr>
                <td id="mth"><strong>Subtotal</strong></td>
                <td id="mtd">{{$invoice->subtotal}}</td>
            </tr>
            <tr>
                <td id="mth"><strong>Discount</strong></td>
                <td id="mtd">{{$invoice->discount}}</td>
            </tr>
            <tr>
                <td id="mth"><strong>Total </strong></td>
                <td id="mtd"><strong>{{$invoice->grandtotal}}</strong></td>
            </tr>


        </table>
        <h6 style="float:right; margin:0px"></h6>
        <div style="margin-top:70px">
            <h5 style="font-style:bold">Note:
                <span style="font-style:italic">All the Funds Are non Returnables.This Receipt is made Automatically there is no need of any type of stamp </span>
            </h5>

        </div>

    </div>
</body>

</html>
