using UnityEngine;
using Sapphus.Audio;
using Sapphus.State;

namespace Sapphus
{
    public class AppManager : Singleton<AppManager>
    {
#pragma warning disable 649
        [SerializeField] private StateMachine _stateMachine;
        [SerializeField] private AudioManager _audioManager;
#pragma warning restore

        private void Start()
        {
            DontDestroyOnLoad(gameObject);
            if (_stateMachine == null)
            {
                Debug.LogError("Error: AppManager object does not have a StateMachine script!");
            }
            if (_audioManager == null)
            {
                Debug.LogError("Error: AppManager object does not have an AudioManager script!");
            }
        }

        public void Init()
        {
            InitPlayerPrefs();
            _stateMachine.Initialize();
            _audioManager.Init();
        }


        private void InitPlayerPrefs()
        {
            // game settings go here!
        }
    }
}

