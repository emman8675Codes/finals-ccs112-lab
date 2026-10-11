<?php

use App\Models\User;

test('tasks screen can be rendered', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/tasks');

    $response->assertStatus(200);
});
