<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
// use Laravel\Sanctum\HasApiTokens;
use Laravel\Passport\HasApiTokens;
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role() {
        return $this->belongsTo(Role::class);
    }

    public function isAdmin()
    {
        return $this->role_id == 1;
    }

    public function isLibrarian()
    {
        return $this->role_id == 2;
    }

    public function isMember()
    {
        return $this->role_id == 3;
    }

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['search']))
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'LIKE', '%' . $filters['search'] . '%')
                    ->orWhere('author', 'LIKE', '%' . $filters['search'] . '%');
            });

        if (isset($filters['sortBy'])){
            if($filters['sortBy'] == 0){
                $query->reorder()->orderBy('name', 'desc');
            }elseif($filters['sortBy'] == 1) {
                $query->reorder()->orderBy('name', 'asc');
            }
        }
    }
}
