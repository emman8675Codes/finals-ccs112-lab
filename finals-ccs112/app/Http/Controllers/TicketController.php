<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    public function index(): Response
    {
        $tickets = Ticket::where('user_id', auth()->id()) // only my tickets
            ->orderByDesc('id')
            ->paginate(10);

        return Inertia::render('Tickets/Index', ['tickets' => $tickets]);
    }

    public function create(): Response
    {
        return Inertia::render('Tickets/Create', ['options' => Ticket::options()]);
    }

    public function store(StoreTicketRequest $request): RedirectResponse
    {
        $ticket = new Ticket($request->validated());
        $ticket->user_id = auth()->id(); // never from the form
        $ticket->save();

        return redirect()->route('tickets.index')->with('success', 'Ticket created.');
    }

    public function show(Ticket $ticket): Response
    {
        Gate::authorize('view', $ticket); // 403 if not owner

        return Inertia::render('Tickets/Show', ['ticket' => $ticket]);
    }

    public function edit(Ticket $ticket): Response
    {
        Gate::authorize('update', $ticket);

        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
            'options' => Ticket::options(),
        ]);
    }

    public function update(UpdateTicketRequest $request, Ticket $ticket): RedirectResponse
    {
        $ticket->update($request->validated()); // policy checked in the Form Request

        return redirect()->route('tickets.show', $ticket)->with('success', 'Ticket updated.');
    }

    public function destroy(Ticket $ticket): RedirectResponse
    {
        Gate::authorize('delete', $ticket);

        $ticket->delete();

        return redirect()->route('tickets.index')->with('success', 'Ticket deleted.');
    }
}