using System.Collections.Generic;
using UnityEngine;

namespace Sapphus.State
{
    /// <summary>
    /// A pushdown automaton to manage the state of the game.
    /// State script is the logic side of a state
    /// Screen script is the viewmodel/input of a state that the State script links to
    /// </summary>
    public class StateMachine : Singleton<StateMachine>
    {
        private Stack<GameState> _currState = new Stack<GameState>();
        private Dictionary<string, GameState> _states = new Dictionary<string, GameState>();

        public void Initialize()
        {
            // Add canvas states
            for (int i = 0; i < transform.childCount; ++i)
            {
                var stateScript = transform.GetChild(i).GetComponent<CanvasGameState>();
                if (stateScript)
                {
                    _states.Add(stateScript.GetState(), stateScript);
                }
            }

            // Init all states
            foreach (var st in _states)
            {
                st.Value.OnInit(this);
            }
        }

        public void PushState(string state)
        {
            var newState = GetState(state);

            if (_currState.Count > 0)
                _currState.Peek().OnFocusExit();

            _currState.Push(newState);

            _currState.Peek().OnEnter();
            _currState.Peek().OnFocusEnter();
        }
        public void PopState()
        {
            _currState.Peek().OnFocusExit();
            _currState.Peek().OnExit();

            _currState.Pop();

            _currState.Peek().OnFocusEnter(); ;
        }

        public void Update()
        {
            if (_currState.Count > 0)
            {
                _currState.Peek().StateUpdate();
            }
        }

        public void SwitchState(string state)
        {
            var newState = GetState(state);

            _currState.Peek().OnFocusExit();
            _currState.Peek().OnExit();

            _currState.Pop();
            _currState.Push(newState);

            _currState.Peek().OnEnter();
            _currState.Peek().OnFocusEnter();
        }

        public GameState GetState(string state)
        {
            if (!_states.ContainsKey(state))
            {
                Debug.LogError("Tried to push nonexisting state " + state + "! Amount of states registered: " + _states.Count.ToString() + " (" + _states.ToString() + ")");
                return null;
            }
            return _states[state];
        }

        private void OnDestroy()
        {
            foreach (var st in _states)
            {
                st.Value.OnDelete();
            }
        }
    }
}
