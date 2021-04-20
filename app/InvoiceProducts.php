<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InvoiceProducts extends Model
{
    protected $table = 'invoice_products';
    public function product(){
        return $this->belongsTo(Product::class, 'product_id');
    }
}
