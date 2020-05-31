/*
 * Copyright 2019 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.hamletshu.mydid.fido2.ui.home

import android.app.Application
import android.content.Intent
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import com.hamletshu.mydid.fido2.repository.AuthRepository
import com.hamletshu.mydid.fido2.repository.SignInState
import com.google.android.gms.fido.fido2.Fido2PendingIntent

//UI에 데이터를 제공하는 역할을 합니다. Repository와 UI 사이에서 커뮤니케이션 센터 역할
class HomeViewModel(application: Application) : AndroidViewModel(application) {

    private val repository = AuthRepository.getInstance(application)

    private val _processing = MutableLiveData<Boolean>()
    val processing: LiveData<Boolean>
        get() = _processing

    val currentUsername: LiveData<String> =
        Transformations.map(repository.getSignInState()) { state ->
            when (state) {
                is SignInState.SigningIn -> state.username
                is SignInState.SignedIn -> state.username
                else -> "User"
            }
        }

    val credentials = repository.getCredentials()

    fun reauth() {
        repository.clearToken()
    }

    fun signOut() {
        repository.signOut()
    }

    fun registerRequest(): LiveData<Fido2PendingIntent> {
        return repository.registerRequest(_processing)
    }

    fun registerResponse(data: Intent) {
        repository.registerResponse(data, _processing)
    }

    fun removeKey(credentialId: String) {
        repository.removeKey(credentialId, _processing)
    }

}
