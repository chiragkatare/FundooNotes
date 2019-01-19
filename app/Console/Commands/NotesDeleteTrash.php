<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Facades\App\Notes;
use Illuminate\Support\Carbon;

class NotesDeleteTrash extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notes:deletetrash';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deletes The Trashed Notes in the database after 7 days';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $notes = Notes::with('labels')->where('deleted', 1)->where( 'updated_at', '>', Carbon::now()->subDays(7))->get();
        foreach ($notes as $note) {
                Notes::destroy($note->id);
            }
        }

}
