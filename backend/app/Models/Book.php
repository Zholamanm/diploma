<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'author', 'description', 'cover_image', 'category_id'];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function tags() {
        return $this->belongsToMany(Tag::class, 'book_tag')->using(BookTag::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }

    public function borrowedBooks() {
        return $this->hasMany(BorrowedBook::class);
    }
}
