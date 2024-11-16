<?php

namespace Database\Seeders;
use Faker\Factory  as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Storage;

use Illuminate\Database\Seeder;
use App\Models\Author;
use App\Models\Comment;
use App\Models\Type;
use App\Models\Book;
class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

     private function getRandomImage()
{
    $imageDirectory = public_path('images/books');

    $images = glob($imageDirectory . '/*.{jpg,jpeg,png,gif}', GLOB_BRACE);

    if (!$images) {
        return null; 
    }

    
    $randomImagePath = $images[array_rand($images)];

    
    return asset('images/books/' . basename($randomImagePath));
}

    public function run(): void
    {
        $imageDirectory = 'images/books/';

        // Ensure the directory exists in storage
        Storage::makeDirectory($imageDirectory);
        $faker=Faker::create();
        for ($index = 0; $index <10; $index++) {
            $authorname=$faker->name();
            $pages=$faker->numberBetween(150,1200);
            $author=Author::firstOrCreate(
                    ['name'=>$authorname],
                    ['bio'=>$faker->paragraph()]
            );
            $book=Book::create([
                'title'=>$faker->sentence(rand(1,3),),
                'isbn'=>$faker->isbn13,
                'description'=>$faker->boolean()?$faker->paragraph:null,   
                'published_year'=>$faker->year('now'),
                'pages'=>$pages,
                'cover_path'=>$this->getRandomImage(),
                'current_page_number'=>$faker->numberBetween(0,$pages),
            ]);
            $book->authors()->attach($author->id);

            $types=Type::inRandomOrder()->take(rand(1,3))->get();
            $book->types()->attach($types->pluck('id')->toArray());

            for($commentid=0;$commentid<rand(0,5);$commentid++){
                Comment::create([
                    'book_id'=>$book->id,
                    'comment'=>$faker->paragraph,
                ]);
            }
        }
    }
}
