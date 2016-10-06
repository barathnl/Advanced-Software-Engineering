package com.barath.lab6app;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ImageView;

public class TestActivity extends AppCompatActivity {

    ImageView userImage;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);
        userImage = (ImageView) findViewById(R.id.imageView);
        /*final String path = getIntent().getStringExtra("bmpimage");
        Bitmap bmp = BitmapFactory.decodeFile(path);*/
        /*Intent intent = new Intent();
        Bitmap bmp = (Bitmap) intent.getParcelableExtra("bmpimage");*/
        Bundle extra1 = getIntent().getExtras();
        byte[] bytes = extra1.getByteArray("bmpimage");
        Bitmap bmp = BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
        userImage.setImageBitmap(bmp);
    }
}
