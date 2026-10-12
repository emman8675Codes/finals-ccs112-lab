<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'demo@example.com'], // safe to re-run
            ['name' => 'Demo User', 'password' => 'Demo@12345'] // hashed by the model cast
        );
    }
}