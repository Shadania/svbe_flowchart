using UnityEngine;
using UnityEngine.Audio;
using UnityEngine.UI;

namespace Sapphus.Audio
{
    public class AudioTestScript : MonoBehaviour
    {
#pragma warning disable 649
        [SerializeField] private Button _startMusicButton;
        [SerializeField] private Button _stopMusicButton;
        [SerializeField] private Button _sound1Button;
        [SerializeField] private Button _sound2Button;

        [SerializeField] private Slider _masterSlider;
        [SerializeField] private Slider _musicSlider;
        [SerializeField] private Slider _sfxSlider;

        [SerializeField] private AudioMixer _mixer;
#pragma warning restore

        private void Start()
        {
            _startMusicButton.onClick.AddListener(StartMusic);
            _stopMusicButton.onClick.AddListener(StopMusic);
            _sound1Button.onClick.AddListener(Sound1);
            _sound2Button.onClick.AddListener(Sound2);

            _masterSlider.onValueChanged.AddListener(SetMasterVolume);
            _musicSlider.onValueChanged.AddListener(SetMusicVolume);
            _sfxSlider.onValueChanged.AddListener(SetSfxVolume);
        }



        private void StartMusic()
        {
            AudioManager.Instance.PlayMusic("music");
        }
        private void StopMusic()
        {
            AudioManager.Instance.StopMusic();
        }
        private void Sound1()
        {
            AudioManager.Instance.PlaySound("oop");
        }
        private void Sound2()
        {
            AudioManager.Instance.PlaySound("coins");
        }

        private void SetMasterVolume(float val)
        {
            _mixer.SetFloat("MasterVolume", Mathf.Log(val) * 20);
            Debug.Log(Mathf.Log(val) * 20);
        }

        private void SetMusicVolume(float val)
        {
            _mixer.SetFloat("MusicVolume", Mathf.Log(val) * 20);
            Debug.Log(Mathf.Log(val) * 20);
        }

        private void SetSfxVolume(float val)
        {
            _mixer.SetFloat("SfxVolume", Mathf.Log(val) * 20);
            Debug.Log(Mathf.Log(val) * 20);
        }
    }
}