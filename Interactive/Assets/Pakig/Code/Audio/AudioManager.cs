using System.Collections.Generic;
using UnityEngine;


namespace Sapphus.Audio
{
    [System.Serializable]
    public struct AudioListElement
    {
        public string Identifier;
        public AudioClip Audio;
        private int _id;
        public int Id
        {
            get { return _id; }
        }

        public void SetId(int id)
        {
            _id = id;
        }
    }

    public class AudioManager : Singleton<AudioManager>
    {
#pragma warning disable 649
        [SerializeField] private AudioSource _musicSource;
        [SerializeField] private AudioSource _sfxSource;

        [SerializeField] private List<AudioListElement> _audioList = new List<AudioListElement>();
        private Dictionary<string, AudioClip> _audioDic = new Dictionary<string, AudioClip>();

        private string _currMusicPlaying;
        [SerializeField] private bool _usesAppManager = false;
#pragma warning restore

        private void Awake()
        {
            if (_usesAppManager == false)
            {
                Init();
            }
        }

        public void Init()
        {
            // Dictionaries are not serialized properly, this would be
            // the most user friendly way without researching how to
            // force serialize dictionaries
            foreach (var audio in _audioList)
            {
                _audioDic.Add(audio.Identifier, audio.Audio);
            }
        }

        public void PlayMusic(string id)
        {
            if (_audioDic.ContainsKey(id))
            {
                if (_currMusicPlaying == id)
                    return;

                _musicSource.clip = _audioDic[id];
                if (_musicSource.isPlaying == false)
                    _musicSource.Play();
            }
            else
            {
                Debug.LogError("Audio manager does not know music with key " + id);
            }
        }

        public void StopMusic()
        {
            _musicSource.Stop();
        }

        public void PlaySound(string id, float volumeScale = 1.0f)
        {
            if (_audioDic.ContainsKey(id))
            {
                _sfxSource.PlayOneShot(_audioDic[id], volumeScale);
            }
            else
            {
                Debug.LogError("Audio manager does not know sound with key " + id);
            }
        }
    }
}