package com.barath.lab6app;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;

import java.io.*;

public class MainActivity extends AppCompatActivity {

    String userChoosenTask;
    int TAKE_PHOTO_CODE = 0;
    int SELECT_FILE =1;
    ImageView userImage ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        userImage = (ImageView) findViewById(R.id.imageView);
        ImageButton capture = (ImageButton) findViewById(R.id.imageButton);
        capture.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                final CharSequence[] items = { "Take Photo", "Choose from Gallery", "Cancel" };
                AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
                builder.setTitle("Upload Photo!");
                builder.setItems(items, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int item) {
                        if (items[item].equals("Take Photo")) {
                            userChoosenTask = "Take Photo";
                            //Invoke camera
                            Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                            startActivityForResult(cameraIntent, TAKE_PHOTO_CODE);

                        } else if (items[item].equals("Choose from Gallery")) {
                            userChoosenTask = "Choose from Gallery";
                            //Invoke Gallery of image only
                            Intent intent = new Intent();
                            intent.setType("image/*");
                            intent.setAction(Intent.ACTION_GET_CONTENT);//
                            startActivityForResult(Intent.createChooser(intent, "Select File"),SELECT_FILE);
                        } else if (items[item].equals("Cancel")) {
                            dialog.dismiss();
                        }
                    }
                });
                AlertDialog builder1 = builder.create();
                builder1.show();
            }
        });
    }



    Bitmap photo = null;
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == TAKE_PHOTO_CODE && resultCode == RESULT_OK && data != null) {
            photo = (Bitmap) data.getExtras().get("data");
            userImage.setImageBitmap(photo);
            Log.d("CameraDemo", "Pic saved");
        }else if(requestCode == SELECT_FILE && resultCode == RESULT_OK && data != null){
            try {
                photo = MediaStore.Images.Media.getBitmap(getApplicationContext().getContentResolver(), data.getData());
                userImage.setImageBitmap(photo);
            }catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void redirectToHome(View v){
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        //Compressing Photo
        photo.compress(Bitmap.CompressFormat.PNG, 80, stream);
        byte[] bytes = stream.toByteArray();
        Intent redirect = new Intent(MainActivity.this, HomeActivity.class);
        //Sending Photo bitmap
        redirect.putExtra("bmpimage",photo);
        startActivity(redirect);
    }
}