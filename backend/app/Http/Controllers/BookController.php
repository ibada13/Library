<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Book;
use App\Models\Comment;
use App\Http\Requests\GetBookRequest;
use App\Models\Author;

class BookController extends Controller
{
    public function getBook(GetBookRequest $request ){


        $id = $request->input("id");
        $book = Book::find($id);
        if(!$book){
            return Response()->json(["error"=>"Book not found "] , 404);

        }
        $comments= Comment::where('book_id',$book->id)
        ->orderBy('created_at','desc')
        ->paginate(3)
        ->withQueryString()
        ;
        // dd($comments);
        return response()->json([
            "book"=>$book,
            "comments"=>$comments
            ] , 200);
    }





    ###########################################
    ###
    ### this function to fetch the books headlines and covers for homepage 
    ###
    ### takes as not required params limit that should be between 10 and 20
    ###
    ### and pages that should be bigger than 1
    ##########################################################
    public function getBooks(Request $request){
        $validator=Validator::make($request->all(),[
            "limit"=>"integer|min:10|max:20",
          
        ]);
        if($validator->fails()){
            return Response()->json(["error"=>$validator->errors()],422);
        }
        $limit =$request->input('limit',10);
    
        $books = Book::orderBy('created_at','desc')
        ->select('id','title','cover_path')
        ->paginate($limit );
        return Response()->json($books, 200);
    }


    public function deletebook(Request $request){
        $validator = Validator::make($request->all(),[
            "id"=>"required|integer",
        ]);
        if($validator->fails()){
            return Response()->json(["error"=>$validator->errors()],422);
        }
        $id= $request->input('id');
        $book= Book::find($id);
        if(!$book){
            return Response()->json(["error"=>"Book not found"] , 404);
        }
        try{
            $book->delete();
            return Response()->json([
                "message"=>"Book deleted sucessfully"
            ],200);
        }
        catch(\Exception $e){
            return Response()->json([
                "error"=>"an error occured while deleting this book",
                "details"=>$e->getMessage(),
            ],500);
            
        }
    }


    public function postbook(Request $request ){
        $rules = [
            "title"=>"required|string|max:16",
            "description"=>"nullable|string|max:100",
            "authors"=>"array|distinct",
            "authors.*"=>"string|max:16",
            "published_year"=>"nullable|integer|digits:4",
            // "type" =>"",
            "isbn"=>"nullable",
            "pages"=>"required|integer|min:1",

        ] ; 
        $validator = Validator::make($request->all() , $rules);

        if($validator->fails()){
            return response()->json([
                "error"=>$validator->errors(),
            ],422);
        }

        $validatedData = $request->only(['title', 'description', 'pages', 'published_year']);
        $validatedData['isbn'] = rand(64656,54545454 );        
        $book = Book::create($validatedData);
        if($request->has('authors')&&!empty($request->authors)){
            $authorsIds =[];
            foreach($request->authors as $authorName){

                $author  = Author::firstOrCreate(["name"=>$authorName]);
                $authorsIds [] = $author->id ;
            }
            if(!empty($authorsIds)){
                $book->authors()->attach($authorsIds);
            }
        }
        return response()->json([
            "message"=>"book was created sucessfully.",
            "book"=>$book,
        ],201);
    }
}

