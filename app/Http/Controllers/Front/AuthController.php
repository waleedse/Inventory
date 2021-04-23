<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\User;
use App\User_Meta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function user_login(Request $request){
        $user = User::where('username',$request->username)->first();
        if($user){
            if($user->password == $request->password){
                $user_meta = User_Meta::
                        where('user_id',$user->id)
                        ->where('user_ip',$request->ip())
                        ->first();
                        if(!$user_meta){
                            $user_meta = new User_Meta();
                            $user_meta->token = Hash::make($user->id . time());
                            $user_meta->user_ip = $request->ip();
                            $user_meta->user_id = $user->id;
                            $user_meta->token_validation = date("d-m-Y H:m:sa");
                            $user_meta->save();
                        }
                        $user->token = $user_meta->token;
                $response = ['status' => 200 , 'msg' => 'Authentication Successfull.','user'=>$user];
                return $response;
            }else{
                $response = ['status' => 404 , 'msg' => 'Password authentication failed.'];
                return $response;
            }
        }else{
            $response = ['status' => 404 , 'msg' => 'User not found.'];
            return $response;
        }
    }
    public function user_check_auth(Request $request){
        $user = User_Meta::where('token',$request->token)->where('user_ip',$request->ip())->first();
        if($user){
                $u = User::where('id',$user->user_id)->first();
                $response = ['status' => 200 , 'msg' => 'Authentication Successfull.','user'=>$u];
                return $response;
        }else{
            $response = ['status' => 404 , 'msg' => 'User not found.'];
            return $response;
        }
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
