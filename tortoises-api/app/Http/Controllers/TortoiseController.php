<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tortoise;
class TortoiseController extends Controller
{
    public function getAllTortoises() {
        $tortoises = Tortoise::get()->toJson(JSON_PRETTY_PRINT);
        return response($tortoises, 200);
      }

    public function createTortoise(Request $request) {
        $tortoise = new Tortoise;
        $tortoise->length = $request->length;
        $tortoise->weight = $request->weight;
        $tortoise->result = $request->result;
        $tortoise->min = $request->min;
        $tortoise->avg = $request->avg;
        $tortoise->max = $request->max;
        $tortoise->save();

        return response()->json(["message"  => "tortoise record created"],201);
    }

    public function deleteTortoise ($id) {
        if(Tortoise::where('id', $id)->exists()) {
            $tortoise = Tortoise::find($id);
            $tortoise->delete();
    
            return response()->json([
              "message" => "records deleted"
            ], 202);
          } else {
            return response()->json([
              "message" => "Tortoise not found"
            ], 404);
          }
    }
}
