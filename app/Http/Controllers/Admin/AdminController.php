<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Admin;
use App\User;
use Exception;
use Hash;
class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function admin_login(Request $request){
        $user = Admin::where('username',$request->username)->first();
        if($user){
            if($user->password == $request->password){
                $user->token = Hash::make($user->id . time());
                $user->ip = $request->ip();
                $user->save();
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
    public function admin_check_auth(Request $request){
        $user = Admin::where('token',$request->token)->where('ip',$request->ip())->first();
        if($user){
                $response = ['status' => 200 , 'msg' => 'Authentication Successfull.','user'=>$user];
                return $response;
        }else{
            $response = ['status' => 404 , 'msg' => 'User not found.'];
            return $response;
        }
    }
    public function add_user(Request $request)
    {
        $newuser = new User();
        $newuser->username = $request->username;
        $newuser->password = $request->pass;
        $newuser->fullname = $request->fullname;
        $newuser->shortname = $request->shortname;
        $newuser->fulladdress = $request->fulladdresas;
        $newuser->shortaddress = $request->ShortAddress;
        $newuser->phone = $request->phone;
        $newuser->brandname = 'Sale System';
        $newuser->logo = 'logo.png';
        $newuser->status = 'Active';
        $newuser->save();
    }
    public function getuserbyid(Request $request){
        $user = User::find($request->id);
        return $user;
    }
    public function update_user(Request $request)
    {
        $updateuser = User::find($request->id);
        $updateuser->username = $request->username;
        $updateuser->password = $request->pass;
        $updateuser->fullname = $request->fullname;
        $updateuser->shortname = $request->shortname;
        $updateuser->fulladdress = $request->fulladdresas;
        $updateuser->shortaddress = $request->ShortAddress;
        $updateuser->phone = $request->phone;
        $updateuser->status = $request->status;
        $updateuser->brandname = $request->brandname;
        $updateuser->save();
    }
    public function get_users()
    {
        $users = User::all();
        // foreach($users as $u){
        //     $studnets = DB::select('select * from students where user = :user', ['user' => $u->id]);
        //     $u->stds = sizeof($studnets);
        // }
        return $users;
    }
    public function upload_business_logo(Request $request){
        try{
            if ($request->hasFile('file')) {
                $file = $request->file;
                $filename = $file->getClientOriginalName();
                $image = date('His') . $filename;
                $destination_path = public_path() . '/images/';
                $file->move($destination_path, $image);
                $url = $image;
                $updateuser = User::find($request->id);
                $updateuser->logo = $url;
                $updateuser->save();
                $response = ['status' => 200 , 'msg' =>'File Uploaded.','url' => $url];
                return $response;
            }
        }catch(Exception $e){
            $response = ['status' => 401 , 'msg' => 'File Uploaded.','error' => $e];
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
