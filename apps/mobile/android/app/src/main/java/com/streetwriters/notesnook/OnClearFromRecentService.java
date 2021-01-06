package com.streetwriters.notesnook;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;
import com.tencent.mmkv.MMKV;

public class OnClearFromRecentService extends Service {

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
    
        return START_NOT_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    @Override
    public void onTaskRemoved(Intent rootIntent) {
        MMKV mmkv = MMKV.mmkvWithID("default",MMKV.SINGLE_PROCESS_MODE);
        mmkv.removeValueForKey("appState");
        stopSelf();
        System.exit(0);
    }
}