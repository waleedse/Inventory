<html>

<head>

<style type="text/css">


#mytable {
  width: 100%;
  border:1px solid black;
  border-collapse: collapse;
}
.center-text{
    text-align:center;
}
.total_div{
    margin-top:60px;
    margin-left:60%;
}
#mytable th, td{
    border:1px solid black;
    text-align:center;
    border-collapse: collapse;
    width: 100%;
    font-size: 12px
}
th {
	padding-left: 1px;
   font-weight:bold;
   font-size:12px;
}
#mtd {
	padding-left: 10px;
    font-size:10px;
}
.text_right{
    text-align:right;
    border: none !important;
    font-size:20px;
}
.text_right_label{
    text-align:right;
    border: none !important;
    font-size:14px;
}
.margin_left{
    margin-left:30px;
}
/* .panel-title{
    font-weight:500;
    font-family:Helvetica;
} */
#bottom{
    width:100%;
}
#bottom tr{
    border-bottom:1px solid gray;
}
.customer_address{
    position:absolute;
        top:190px;
        left:70%;
}

#rowtable{
        width: 100%;
        font-size:14px;
        font-style:bold;
        margin-left:0px;
        margin-top:0px;
    }
    #rowtable2{
        width: 100%;

        margin-left:0px;
        margin-top:0px;
    }
    .topheads{
        font-size:12px
    }
div {
	font-family:Helvetica;
}



.products_table{
    margin-top:0px
}



.site_logo{
        width:100px;
        height:100px;
        margin-top:10px;
    }
    .company-details{
        position:absolute;
        top:-30px;
        left:65%;
}
#top_table{
    width: 100%;
}
#top_table td {
    border: 0px;
}
.dates{
    margin-top: -15px;
}
</style>

</head>
    <body>
    <?php
        $logourl = 'images/' . $user->logo;
        ?>
    <div class="container">
    <div class="row">
        <div class="col-xs-12">
    		<div class="invoice-title">
                <img class="site_logo"
                src="{{$logourl}}"><span>

                    </span>
            </div>
            <div class="company-details">
                        <h3 class="name">
                           {{$user->shortname}}
                        </h3>
                        <div> {{$user->shortaddress}}</div>
                        <div>  {{$user->phone}}</div>
                    </div>
            <hr>
            <h2 class="center-text">{{$title}}</h2>
            <h5 class="center-text dates">({{$startdate}} - {{$enddate}})</h5>

    	</div>
    </div>
    <table id="top_table">
        <tr>
            <td style="text-align: left">Total Invoices: {{$invoices['total_invoices']}}</td>
            <td style="text-align: right">Invoice Total: Rs,{{$invoices['invoice_totals']}}</td>
        </tr>
    </table>
    <div  class="products_table">
    	<h4 class="panel-title">Invoices</h4>
    	    <div >

    					<table id = "mytable">
    						<thead>
                                <tr>
                                    <td class="text-center"><strong>Sr</strong></td>
                                    <td class="text-center"><strong>Invoice ID</strong></td>
                                    <td class="text-center"><strong>Date</strong></td>
                                    <td class="text-center"><strong>Sub Total</strong></td>
        							<td class="text-center"><strong>Discount</strong></td>
                                    <td class="text-center"><strong>Grand Total</strong></td>
                                </tr>
    						</thead>
    						<tbody>
                                <!-- foreach ($order->lineItems as $line) or some such thing here -->
                                @foreach($invoices['invoices'] as $key => $s)
    							<tr>
    								<td>{{$key+1}}</td>
    								<td class="text-center">{{$s['id']}}</td>
                                    <td class="text-center">{{$s['date']}}</td>
                                    <td class="text-center">{{$s['subtotal']}}</td>
                                    <td class="text-center">{{$s['discount']}}</td>
                                    <td class="text-center">{{$s['grandtotal']}}</td>
                                </tr>
                                @endforeach
    						</tbody>
    					</table>

                    </div>
    </div>
</div>

    </body>
</html>
