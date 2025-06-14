package com.authnative

import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class DeviceNameModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "DeviceName"

    @ReactMethod
    fun getDeviceName(promise: Promise) {
        val name = "${Build.MANUFACTURER} ${Build.MODEL}"
        promise.resolve(name)
    }
}