<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subscriber;

class SubscriberSeeder extends Seeder
{
    public function run()
    {
        $subscribers = [
            ['email' => 'sarah.ahmed@example.com'],
            ['email' => 'fatima.khan@example.com'],
            ['email' => 'ayesha.rahman@example.com'],
            ['email' => 'nadia.islam@example.com'],
            ['email' => 'zara.hassan@example.com'],
            ['email' => 'maria.chowdhury@example.com'],
            ['email' => 'sadia.malik@example.com'],
            ['email' => 'hina.sultana@example.com'],
            ['email' => 'amina.begum@example.com'],
            ['email' => 'laila.ahmed@example.com'],
            ['email' => 'rania.khan@example.com'],
            ['email' => 'samira.hossain@example.com'],
            ['email' => 'yasmin.ali@example.com'],
            ['email' => 'zainab.siddiqui@example.com'],
            ['email' => 'farah.iqbal@example.com'],
            ['email' => 'noor.fatima@example.com'],
            ['email' => 'aliya.shah@example.com'],
            ['email' => 'maryam.karim@example.com'],
            ['email' => 'rabia.nawaz@example.com'],
            ['email' => 'sana.yusuf@example.com'],
            ['email' => 'hira.abdullah@example.com'],
            ['email' => 'iman.rashid@example.com'],
            ['email' => 'khadija.omar@example.com'],
            ['email' => 'lubna.farooq@example.com'],
            ['email' => 'mehreen.aziz@example.com'],
            ['email' => 'nawal.hussain@example.com'],
            ['email' => 'qurat.abbas@example.com'],
            ['email' => 'rida.mahmood@example.com'],
            ['email' => 'saima.raza@example.com'],
            ['email' => 'tasneem.khan@example.com'],
            ['email' => 'uzma.sheikh@example.com'],
            ['email' => 'warda.saleem@example.com'],
            ['email' => 'yusra.haider@example.com'],
            ['email' => 'zahra.naqvi@example.com'],
            ['email' => 'aisha.mirza@example.com'],
            ['email' => 'bushra.akram@example.com'],
            ['email' => 'dua.tariq@example.com'],
            ['email' => 'esha.jamil@example.com'],
            ['email' => 'fiza.anwar@example.com'],
            ['email' => 'gulnaz.baig@example.com'],
        ];

        foreach ($subscribers as $subscriber) {
            Subscriber::updateOrCreate(
                ['email' => $subscriber['email']],
                $subscriber
            );
        }
    }
}
